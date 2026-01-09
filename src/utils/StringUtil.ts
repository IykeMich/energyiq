import { format } from "date-fns";
import { useLocation } from "react-router-dom";

type SortType = "date" | "number" | "string";

export class StringUtil {
    // -------------------------------------------------------------
    // INTERNAL UTILITIES
    // -------------------------------------------------------------
    private static countOccurrences(mainStr: string, subStr: string) {
        let count = 0;
        let index = mainStr.indexOf(subStr);

        while (index !== -1) {
            count++;
            index = mainStr.indexOf(subStr, index + 1);
        }
        return count;
    }

    static isStringNullOrEmpty(str: string | null) {
        return str == null || str === "";
    }

    // -------------------------------------------------------------
    // SORTING FUNCTIONS
    // -------------------------------------------------------------
    static dynamicSort<T>(array: T[], key: keyof T, type: SortType = "string"): T[] {
        if (!array?.length) return [];
        return [...array].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            switch (type) {
                case "date":
                    return new Date(valueB as string).getTime() -
                           new Date(valueA as string).getTime();

                case "number":
                    return Number(valueB) - Number(valueA);

                case "string":
                default:
                    return (valueB as string).localeCompare(valueA as string);
            }
        });
    }

    static dynamicADSort<T>(array: T[], key: keyof T, type: SortType = "string"): T[] {
        if (!array?.length) return [];
        return [...array].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            switch (type) {
                case "date":
                    return (
                        new Date(valueA as string).getTime() -
                        new Date(valueB as string).getTime()
                    );

                case "number":
                    return Number(valueA ?? 0) - Number(valueB ?? 0);

                case "string":
                default:
                    return (valueA?.toString() || "").localeCompare(valueB?.toString() || "");
            }
        });
    }

    static sortAlphabetically<T>(
        array: T[],
        key?: keyof T | null,
        options: {
            ignoreCase?: boolean;
            locale?: string | string[];
            direction?: "ascending" | "descending";
        } = {}
    ): T[] {
        const { ignoreCase = true, locale = "en", direction = "ascending" } = options;
        const result = [...array];

        return result.sort((a, b) => {
            let aValue: string;
            let bValue: string;

            if (key && typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
                aValue = String(a[key] || "");
                bValue = String(b[key] || "");
            } else {
                aValue = String(a);
                bValue = String(b);
            }

            const aCompare = ignoreCase ? aValue.toLowerCase() : aValue;
            const bCompare = ignoreCase ? bValue.toLowerCase() : bValue;

            const comp = aCompare.localeCompare(bCompare, locale);
            return direction === "ascending" ? comp : -comp;
        });
    }

    // -------------------------------------------------------------
    // URL HELPERS
    // -------------------------------------------------------------
    static doesUrlEndWith(suffix: string, url: string = window.location.href) {
        return url.endsWith(suffix);
    }

    static useUrlSuffix(suffixes: string[]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const location = useLocation();
        return suffixes.some(
            (suffix) =>
                location.pathname.endsWith(suffix) ||
                location.hash.endsWith(suffix)
        );
    }

    // -------------------------------------------------------------
    // TEXT TRANSFORMATION
    // -------------------------------------------------------------
    static toTitleCase(sentence: string) {
        const words = sentence?.split(" ");
        return words
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    static convertToSentenceCase(input: string): string {
        const isCamelCase = /[a-z][A-Z]/.test(input);
        const isSnakeCase = /_/.test(input);
        if (!isCamelCase && !isSnakeCase) return this.toTitleCase(input);

        let result = input;

        if (isSnakeCase) result = result.replace(/_/g, " ");
        if (isCamelCase) result = result.replace(/([a-z])([A-Z])/g, "$1 $2");

        result = result.replace(/^./, (str) => str.toUpperCase());
        return this.toTitleCase(result);
    }

    static ultimateRemoveWordFromASentence(sentence: string, word: string) {
        return sentence.replace(new RegExp(`\\b${word}\\b`, "g"), "").replace(/\s{2,}/g, " ").trim();
    }

    static shortenWord(word: string, replace = "...", length = 28) {
        return word.length >= length
            ? word.replace(/(\r\n|\n|\r)/gm, "").slice(0, length) + replace
            : word.replace(/(\r\n|\n|\r)/gm, "");
    }

    static abbreviateToTwoCharacter(word: string): string {
        if (this.isStringNullOrEmpty(word)) return "";
        const parts = word.trim().split(" ");
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        if (word.length > 1) return (word[0] + word[1]).toUpperCase();
        return word[0]?.toUpperCase() || "";
    }

    static splitWords(text: string, start = 0, end = 1) {
        return text ? `${text.split(" ")[start]} ${text.split(" ")[end]}` : "";
    }

    static replaceUnderscoresWithSpaces(text: string): string {
        if (!text) return "";
        return text.replace(/_/g, " ");
    }

    static underscoreToTitleCase(text: string): string {
        if (!text) return "";
        const withSpaces = this.replaceUnderscoresWithSpaces(text);
        return this.toTitleCase(withSpaces);
    }

    // -------------------------------------------------------------
    // AMOUNT FORMATTERS
    // -------------------------------------------------------------
    static formatAmount(amount: string): string {
        const numeric = parseFloat(amount.replace(/,/g, ""));
        if (amount.endsWith(".")) return numeric.toLocaleString("en-US") + ".";
        if (amount.includes(".") && this.countOccurrences(amount, ".") === 1) {
            const [int, dec] = amount.split(".");
            const formattedInt = this.formatAmount(int);
            return formattedInt + "." + dec;
        }
        if (amount.includes(".")) return amount;
        return numeric.toLocaleString("en-US");
    }

    static formatAmountDp(amount: string): string {
        if (!amount || isNaN(parseFloat(amount.replace(/,/g, "")))) return "0.00";

        const clean = amount.replace(/,/g, "");

        if (clean.endsWith(".")) {
            return parseFloat(clean).toLocaleString("en-US") + ".00";
        }

        if (clean.includes(".") && this.countOccurrences(clean, ".") === 1) {
            const [int, dec] = clean.split(".");
            const formattedInt = parseFloat(int).toLocaleString("en-US");

            let formattedDec = dec;
            if (dec.length === 0) formattedDec = "00";
            else if (dec.length === 1) formattedDec = dec + "0";
            else if (dec.length > 2) formattedDec = dec.substring(0, 2);

            return formattedInt + "." + formattedDec;
        }

        return parseFloat(clean).toLocaleString("en-US") + ".00";
    }

    static enhancedFormatAmount(amount: string): string {
        if (!amount) return "0.00";
        const cleaned = amount.replace(/[^\d.,]/g, "");

        if (cleaned.includes(".")) {
            const [whole, dec] = cleaned.split(".");
            const wholeFormatted = this.formatAmount(whole);

            let decimalFormatted: string;
            if (dec.length === 0) decimalFormatted = "00";
            else if (dec.length === 1) decimalFormatted = dec + "0";
            else {
                const rounded = Math.round(parseFloat("0." + dec) * 100) / 100;
                decimalFormatted = rounded.toString().substring(2);
                if (decimalFormatted.length === 1) decimalFormatted += "0";
            }
            return wholeFormatted + "." + decimalFormatted;
        }

        return this.formatAmount(cleaned);
    }

    static formatAmountWithDecimals(amount: string): string {
        if (!amount) return "0.00";
        const cleaned = amount.replace(/[^\d.,]/g, "").replace(/,/g, "");
        let numeric: number;
        let dp = 0;

        if (cleaned.includes(".")) {
            const [whole, dec] = cleaned.split(".");
            numeric = parseFloat(whole + "." + (dec || "0"));
            dp = dec?.length || 0;
        } else {
            numeric = parseFloat(cleaned);
        }

        if (isNaN(numeric)) return "0.00";
        if (dp > 2) numeric = Math.round(numeric * 100) / 100;

        return numeric.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // -------------------------------------------------------------
    // CARD MASKING
    // -------------------------------------------------------------
    static maskCardNumber(cardNumber: string) {
        if (cardNumber.length !== 16) throw new Error("Input must be a 16-digit number");
        return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(12)}`;
    }

    // -------------------------------------------------------------
    // DATE FORMATTERS
    // -------------------------------------------------------------
    static formatDate(dateString: string) {
        return format(new Date(dateString), "dd-MMM-yyyy");
    }

    static timeMM(timestamp: string) {
        const d = new Date(timestamp);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
            d.getMinutes()
        ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
    }

    static getDaySuffix(day: number) {
        if (day >= 11 && day <= 13) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    static timeFMM(timestamp: string) {
        const date = new Date(timestamp);
        date.setHours(date.getHours() - 1);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const suffix = this.getDaySuffix(day);
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const mins = String(date.getMinutes()).padStart(2, "0");
        const secs = String(date.getSeconds()).padStart(2, "0");

        return `${month} ${day}${suffix}, ${year} ${hours}:${mins}:${secs}`;
    }

    static getFormattedHour(timestamp: string) {
        return new Date(timestamp).getHours().toString().padStart(2, "0");
    }
}
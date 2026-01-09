export class HelperUtil {
    static convertDate = (dateString: string) => {
        const date = new Date(dateString);

        // Options for formatting the date
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        // Convert the date to the desired format
        return date.toLocaleDateString('en-US', options);
    };

    static formatTime(dateTimeString: string) {
        // Create a new Date object from the input string
        const date = new Date(dateTimeString);

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // if hours is 0, set it to 12 (for midnight)

        // Format minutes as two digits
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

        // Return formatted time
        return `${hours}:${minutesFormatted} ${ampm}`;
    }

    /**
     * Gets the frontend base URL for password reset links
     * Uses environment variable if available, otherwise falls back to window.location.origin
     * This allows the backend to construct the correct reset link for emails
     */
    static getFrontendBaseUrl(): string {
        // Check for environment variable first (for Vercel/production)
        const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
        
        if (frontendUrl) {
            return frontendUrl;
        }
        
        // Fallback to current origin (works for localhost and when env var is not set)
        return window.location.origin;
    }

}
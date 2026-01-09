import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import * as React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DefaultDropdownProps extends Omit<React.ComponentProps<typeof Select>, "onValueChange" | "value"> {
  label?: string;
  name?: string;
  options: DropdownOption[];
  placeholder?: string;
  formik?: any;
  minClassName?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  leftIconSpace?: number;
  onValueChange?: (value: string) => void;
  value?: string;
  loading?: boolean;
  loadingText?: string;
}

export const DefaultDropdown = ({
  label,
  minClassName,
  formik,
  options,
  placeholder,
  leftIcon,
  leftIconSpace = 20,
  className,
  name,
  onValueChange,
  value,
  loading = false,
  loadingText = "options",
  ...rest
}: DefaultDropdownProps) => {
  const [inputId] = useState(() => String(new Date().getTime() * Math.random()));

  const isError = formik?.touched?.[name ?? ""] && formik?.errors?.[name ?? ""];

  const resolvedValue = formik 
    ? (formik.values[name ?? ""] || undefined) 
    : (value || undefined);
  const resolvedOnValueChange = (selectedValue: string) => {
    if (formik && name) {
      // Set value with validation enabled
      formik.setFieldValue(name, selectedValue, true);
      // Mark as touched
      formik.setFieldTouched(name, true, false);
      // Validate the field immediately
      formik.validateField(name);
    }
    onValueChange?.(selectedValue);
  };

  return (
    <div className={cn("grid gap-1", minClassName)}>
      {label && (
        <Label htmlFor={inputId} className={"text-[14px] font-light pl-2"}>
          {label}
        </Label>
      )}
      <div className="relative">
        {leftIcon && (
          <div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10 pointer-events-none"
          >
            {leftIcon}
          </div>
        )}
        <Select
          value={resolvedValue}
          onValueChange={resolvedOnValueChange}
          {...rest}
        >
          <SelectTrigger
            id={inputId}
            className={cn(
              "w-full! border-input rounded-full h-[44px]! focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#FBC02D]",
              isError && "border-red-500! border!",
              loading && "cursor-not-allowed opacity-70",
              className
            )}
            style={leftIcon ? { paddingLeft: `${leftIconSpace}px` } : undefined}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-current" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <SelectValue placeholder={placeholder} />
            )}
          </SelectTrigger>
          <SelectContent>
            {loading ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading {loadingText}...</span>
              </div>
            ) : options.length > 0 ? (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No {loadingText} available
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <p className={"text-[#525252] text-[12px]"}>
        {isError ? formik?.errors?.[name ?? ""] : ""}
      </p>
    </div>
  );
};


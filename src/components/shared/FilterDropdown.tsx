import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onValueChange,
  className,
}: FilterDropdownProps) {
  const [selectedValue, setSelectedValue] = React.useState(value || label);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onValueChange?.(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-3 py-1 text-xs border border-gray-600 light:border-gray-300 rounded-full text-gray-300 light:text-gray-700 flex items-center gap-1 hover:bg-gray-800 light:hover:bg-gray-100 transition-colors ${className || ""}`}
        >
          <span className="w-2 h-2 bg-[#FBC02D] rounded-full"></span>
          {selectedValue}
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleSelect(option)}
            className={selectedValue === option ? "bg-accent" : ""}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



import {Button, buttonVariants} from "@/components/ui/button.tsx";
import * as React from "react";
import type {VariantProps} from "class-variance-authority";
import { Loader2 } from "lucide-react";

interface DefaultButtonProps extends React.ComponentProps<"button">{
    label?: string
    children?: React.ReactNode
    loading?: boolean
    loadingText?: string
    extraClassName?: string
}

export const DefaultButton = ({
    label, 
    children, 
    loading = false,
    loadingText,
    disabled,
    extraClassName,
    ...props
}: DefaultButtonProps & VariantProps<typeof buttonVariants>) => {
  const isDisabled = disabled || loading;
  
  return (
      <Button 
          type="button" 
          className={` ${extraClassName} w-full font-light transition-all duration-200 ${props.className} ${isDisabled ? "cursor-not-allowed! bg-gray-800 light:bg-[#EFEFEB]! text-gray-400 light:text-[#737373]!" : "cursor-pointer! text-white! bg-[#FBC02D] hover:bg-[#FBC02D]/90"} `}
          disabled={isDisabled}
          {...props}
      >
          {loading ? (
              <div className="flex items-center justify-center gap-3 opacity-90">
                  <Loader2 className="h-4 w-4 animate-spin text-current" />
                  <span className="font-medium">{loadingText || label || children}</span>
              </div>
          ) : (
              label || children
          )}
      </Button>
  )
}
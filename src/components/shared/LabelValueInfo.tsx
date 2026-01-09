export default function LabelValueInfo({ label, subLabel, value, className, labelClassName, subLabelClassName, valueClassName }: { label: string, subLabel?: string, value: string, className?: string, labelClassName?: string, subLabelClassName?: string, valueClassName?: string }) {
  return (
          <div className={`flex items-bottom justify-between ${className}`}>
            <div className="flex flex-col gap-y-1.5 shrink-0">
                <p className={`text-[#FAFAFA] text-sm font-light leading-[100%] ${labelClassName}`}>{label}</p>
                {subLabel && <p className={`text-[#FAFAFA] text-xs font-light leading-[100%] ${subLabelClassName}`}>{subLabel}</p>}
            </div>
            <p className={`text-[#FAFAFA] text-sm font-medium leading-[120%] text-end ${valueClassName}`}>{value}</p>
          </div>
        );
}
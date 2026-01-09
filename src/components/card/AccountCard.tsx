interface AccountCardProps {
  label: string;
  value: string;
  className?: string;
}

export default function AccountCard({
  label,
  value,
  className,
}: AccountCardProps) {
  return (
    <div className={`bg-[#FFFFFF1A] light:bg-gray-100 rounded-lg py-6 px-4 gap-3 flex flex-col ${className || ""}`}>
      <p className="text-sm font-normal text-white light:text-[#616161] mb-1">{label}</p>
      <p className="text-xl lg:text-[22px] 2xl:text-[24px] font-semibold text-white light:text-[#171717] leading-[100%] tracking-[-0.02em]">{value}</p>
    </div>
  );
}

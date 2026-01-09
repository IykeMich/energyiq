export default function MetricCard({ title, value, titleClassName, valueClassName }: { title: string, value: string, className?: string, titleClassName?: string, valueClassName?: string }) {
  return (
    <div className="bg-[#FFFFFF1A] light:bg-gray-100 rounded-[14px] py-6 px-4 md:px-6 lg:px-7 gap-3 flex flex-col">
    <p className={`text-sm font-normal text-white light:text-[#616161] mb-1 ${titleClassName || ""}`}>{title}</p>
    <p className={`text-xl lg:text-[22px] 2xl:text-[24px] font-semibold text-white light:text-[#171717] leading-[100%] tracking-[-0.02em] ${valueClassName || ""}`}>{value}</p>
    </div>
  ) 
}
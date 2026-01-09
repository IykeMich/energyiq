import { useRouterUtils } from "@/utils/useRouterUtils";
import ArrowBackIcon from "@/assets/icon/arrow-left.svg";

export default function DefaultPageTitle({ 
  title, 
  subtitle, 
  className, 
  titleClassName,
  goBack = false
}: { 
  title: string, 
  subtitle?: string, 
  className?: string, 
  titleClassName?: string,
  goBack?: boolean
}) {
  const router = useRouterUtils();

  function handleGoBack() {
    router.navigateBack();
  }

  return (
    <div className={`flex flex-col items-start gap-1.5 mb-6 ${className}`}>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        {goBack && (
          <div onClick={handleGoBack} className="tap-effect flex items-center gap-2 bg-[#FBC02DB2] size-[30px] rounded-full p-2">
          <ArrowBackIcon className="w-12 h-12" />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className={`text-[28px] leading-[100%] text-[#FFFFFF] light:text-[#171717] font-medium tracking-[-0.02em] ${titleClassName}`}>
            {title}
          </h1>
          <h3 className="text-sm leading-[100%] text-[#FFFFFF] light:text-[#171717] font-light tracking-[-0.02em]">
            {subtitle}
          </h3>
        </div>
      </div>
    </div>
  )
}

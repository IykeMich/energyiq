import DefaultPageTitle from "@/components/shared/DefaultPageTitle"
import ClockIcon from "@/assets/icon/clock-icon.svg";
import { recentActivityDataset, type RecentActivityDatasetProps } from "@/assets/dataset/RecentActivityDataset";


export default function RecentActivityView() {

  return (
    <section>
        <DefaultPageTitle title="Recent Activity" titleClassName="text-xl!" goBack className="my-4!" />
        
        {/* Recent Activity List */}
        <div className="mt-6 space-y-4">
          {recentActivityDataset.map((item: RecentActivityDatasetProps, index: number) => (
          <div key={index} className="bg-[#6161611A] light:bg-white hover:border hover:border-[#616161B2] rounded-[18px] pt-6 px-6 pb-0! flex-1 lg:max-h-[445px]!
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[100px] tap-effect
        
        ">
          <div className="flex items-end justify-between">
            <div className="flex items-start gap-2">
              <div className={`w-2 h-2 ${item.status === "error" ? "bg-error" : "bg-success"} rounded-full shrink-0 mt-0.5`} />
              <div className="flex flex-col gap-y-4">
                <h3 className="text-base leading-[100%] text-[#FAFAFA] light:text-[#171717] font-medium lg:leading-[100%]">
                {item.title}
                </h3>
              <h3 className="text-xs leading-[100%] text-[#FAFAFA] light:text-[#171717] font-light lg:leading-[100%]">
              {item.description}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-2">
              <ClockIcon />
              <p className="text-xs leading-[100%] text-[#616161B2] light:text-[#171717] font-light lg:leading-[100%]">
              <p className="">{item.timestamp}</p>
              </p>
            </div>
          </div>
          </div>
          ))}
          
        </div>
    </section>

  )
}

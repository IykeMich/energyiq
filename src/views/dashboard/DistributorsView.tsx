import MetricCard from "@/components/card/MetricCard";
import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import DistributorsTable from "@/components/table/DistributorsTable";

export default function DistributorsView() {
  return (
    <section>
      <DefaultPageTitle title="Distributors Management" className="mb-6 mt-4"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
      bg-[#6161611A] light:bg-white rounded-[18px] p-6 shadow-sm mb-6">
          <h3 className="text-sm font-light text-[#FFFFFF] light:text-[#171717]
          col-span-4">
            Today
          </h3>
        <MetricCard title="Total Distributors" value="250" />
        <MetricCard title="Active is Month" value="250" valueClassName="text-[#388E3C]!" />
        <MetricCard title="Average Order Value" value="₦100,000" />
        <MetricCard title="Complaint Rate" value="4.8%" />
      </div>

      {/* Distributors Table */}
      <DistributorsTable />
    </section>
  )
}
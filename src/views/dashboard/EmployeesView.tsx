import MetricCard from "@/components/card/MetricCard";
import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import EmployeesTable from "@/components/table/EmployeesTable";

export default function EmployeesView() {
  return (
    <section>
      <DefaultPageTitle title="Employees Management" />
      {/* metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
      bg-[#6161611A] light:bg-white rounded-[18px] p-6 shadow-sm mb-6">
        <MetricCard title="Total Employees" value="24" />
        <MetricCard title="Active Employees" value="20" />
        <MetricCard title="Pending Invitations" value="4" />
        <MetricCard title="Inactive Accounts" value="5" />
      </div>
      {/* Employees Table */}
      <EmployeesTable />
    </section>
  )
}
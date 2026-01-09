import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import KPICard from "@/components/shared/KPICard";
import SectionHeader from "@/components/shared/SectionHeader";
import FinancialSnapshot from "@/components/shared/FinancialSnapshot";
import SalesTrendChart from "@/components/charts/SalesTrendChart";
import InventoryStatusChart from "@/components/charts/InventoryStatusChart";
// import ActivityList from "@/components/shared/ActivityList";
import PeopleIcon from "@/assets/icon/people-icon.svg";
import CubeIcon from "@/assets/icon/cube-icon.svg";
import QuickActionCard from "@/components/card/QuickActionCard";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";

export default function DashboardOverviewView() {
  const recentActivities = [
    { description: "PetroMax Energy placed new order- PO 234# for 25,00L.", timestamp: "2 hours ago" },
    { description: "GasLink Distributor Tier upgraded to Gold- Distributor Tier upgraded to Gold...", timestamp: "5 hours ago" },
    { description: "Complaint #C-2847 raised...", timestamp: "1 day ago" },
    { description: "New Distributor completed onboarding", timestamp: "2 days ago" },
    { description: "PetroMax Energy placed new order...", timestamp: "2 hours ago" },
    { description: "GasLink Distributor Tier upgraded to Gold...", timestamp: "5 hours ago" },
    { description: "Complaint #C-2847 raised...", timestamp: "1 day ago" },
    { description: "New Distributor completed onboarding", timestamp: "2 days ago" },
  ];

  return (
    <section>
      <DefaultPageTitle title="Dashboard Overview" subtitle="Welcome back! Here's your business performance summary." className="mt-3" />
      
      <div className="flex gap-6">
        {/* KPI Cards */}
        <div className={` flex flex-col gap-y-2 py-6 px-6 bg-[#6161611A] light:bg-white rounded-2xl shadow-sm lg:w-[65%] mb-6`}>
          <h3 className="text-xs font-light text-[#FFFFFF] light:text-[#171717] mb-3">
            Updated 5 mins ago
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <KPICard
              title="Total Distributors"
              value={250}
              badge={{ label: "Active", value: "180" }}
              icon={
                <PeopleIcon className="w-6 h-6" />
              }
            />
            <KPICard
              title="Pending Orders"
              value={25}
              badge={{ label: "Active", value: "10" }}
              icon={
                <CubeIcon className="w-6 h-6" />
              }
            />
            <KPICard
              title="Open Complaints"
              value={4}
              badge={{ label: "Active", value: "180" }}
              valueColor="text-red-500"
              icon={
                <PeopleIcon className="w-6 h-6" />
              }
            />
            <KPICard
              title="Metric"
              value={250}
              badge={{ label: "Status" }}
              icon={
                <PeopleIcon className="w-6 h-6" />
              }
            />
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div className="bg-[#6161611A] light:bg-white hover:border hover:border-[#616161B2] rounded-2xl pt-6 px-6 pb-0! flex-1 lg:max-h-[445px]!
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
        ">
          <SectionHeader
            title="Recent Activity"
            actionLink={{
              label: "See all",
              href: RoutesConstant.recentActivity.index,
            }}
          />
          <div className="space-y-4 max-h-[350px]! overflow-y-auto mt-6 lg:mt-8">
            {recentActivities.map((activity, index) => (
              <div key={index} className={index !== recentActivities.length - 1 ? "border-b border-gray-700 light:border-gray-300 pb-3 flex flex-col gap-y-1 lg:gap-2" : ""}>
                <div className="flex items-start gap-x-2">
                  <div className="w-2 h-2 bg-white rounded-full shrink-0 mt-1.5" />
                  <div className="flex flex-col gap-y-1 lg:gap-2">
                    <p className="text-sm text-white light:text-[#171717] font-light leading-[140%]">{activity.description}</p>
                    <p className="text-xs text-[#FFFFFFCC] light:text-[#616161] mt-1 font-light leading-[100%]">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row gap-6 w-full mb-6">

      {/* Main Content Area - Two Columns */}
      <div className="flex flex-col w-full lg:w-[50%] gap-6">
        {/* Left Column - Financial Snapshot */}
        <div className="space-y-6">
          <FinancialSnapshot
            title="Financial Snapshot"
            actionLink={{
              label: "See Details",
              href: "#",
            }}
            accounts={[
              { label: "Trading Account", value: "₦58.9M" },
              { label: "Sales Account", value: "₦125.9M" },
              { label: "Expense Account", value: "₦18.7M" },
              { label: "Assurance Account", value: "₦12.4M" },
            ]}
          />
        </div>
        {/* Inventory Status chart */}
        <div className="bg-[#27272A] light:bg-white rounded-2xl p-6 shadow-sm"> 
          <SectionHeader
            title="Inventory Status"
            actionLink={{
              label: "Manage",
              href: "#",
            }}
          />
          <InventoryStatusChart />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full mb-6 lg:w-[50%]">
        {/* Sales Trend Section */}
        <div className="bg-[#27272A] light:bg-white rounded-2xl p-6 shadow-sm">
          <SalesTrendChart />
        </div>
        {/* Right Column - Recent Activity */}
        <div className="bg-[#27272A] light:bg-white rounded-2xl p-6 shadow-sm">
          <SectionHeader
            title="Quick Actions"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-6">
            <QuickActionCard icon={<PeopleIcon className="w-6 h-6" />} title="New Product" onClick={() => {}} />
            <QuickActionCard icon={<PeopleIcon className="w-6 h-6" />} title="Add Distributor" onClick={() => {}} />
            <QuickActionCard icon={<PeopleIcon className="w-6 h-6" />} title="View Orders" onClick={() => {}} />
            <QuickActionCard icon={<PeopleIcon className="w-6 h-6" />} title="Add Expense" onClick={() => {}} />
            <QuickActionCard icon={<CubeIcon className="w-6 h-6" />} title="Generate Report" onClick={() => {}} />
            <QuickActionCard icon={<PeopleIcon className="w-6 h-6" />} title="View Orders" onClick={() => {}} />
          </div>
        </div>
      </div>
      </div>

    </section>
  )
}


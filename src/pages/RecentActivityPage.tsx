import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import RecentActivityView from "@/views/RecentActivityView";

export default function RecentActivityPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <RecentActivityView />
    </DashboardLayout>
  )
}

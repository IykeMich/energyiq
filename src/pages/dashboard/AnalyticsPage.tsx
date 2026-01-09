import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import AnalyticsView from "@/views/dashboard/AnalyticsView";

export default function AnalyticsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <AnalyticsView />
    </DashboardLayout>
  )
}
import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import ComplaintsView from "@/views/dashboard/ComplaintsView";

export default function ComplaintsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <ComplaintsView />
    </DashboardLayout>
  )
}
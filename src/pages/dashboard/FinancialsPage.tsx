import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import FinancialsView from "@/views/dashboard/FinancialsView";

export default function FinancialsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <FinancialsView />
    </DashboardLayout>
  )
}
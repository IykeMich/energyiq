import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import DistributorsView from "@/views/dashboard/DistributorsView";

export default function DistributorsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <DistributorsView />
    </DashboardLayout>
  )
}
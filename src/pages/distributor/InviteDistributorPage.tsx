import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import InviteDistributorView from "@/views/distributor/InviteDistributorView";

export default function InviteDistributorPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <InviteDistributorView />
    </DashboardLayout>
  )
}

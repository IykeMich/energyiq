import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import InventoryView from "@/views/dashboard/InventoryView";

export default function InventoryPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <InventoryView />
    </DashboardLayout>
  )
}
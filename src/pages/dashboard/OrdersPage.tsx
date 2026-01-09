import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import OrdersView from "@/views/dashboard/OrdersView";

export default function OrdersPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <OrdersView />
    </DashboardLayout>
  )
}
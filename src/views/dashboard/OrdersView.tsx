import DefaultPageTitle from "@/components/shared/DefaultPageTitle";
import OrdersTable from "@/components/table/OrdersTable";
import { ordersData } from "@/assets/dataset/OrderDataset";

export default function OrdersView() {
  return (
    <section>
      <DefaultPageTitle title="Orders Management" className="mb-6 mt-4"/>
      <OrdersTable data={ordersData} />
    </section>
  )
}
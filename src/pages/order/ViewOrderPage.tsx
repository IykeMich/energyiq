import { DefaultHeader } from '@/components/header/DefaultHeader'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import ViewOrderView from '@/views/order/ViewOrderView'

export default function ViewOrderPage() {
    return (
        <DashboardLayout headerComponent={<DefaultHeader />}>
            <ViewOrderView />
        </DashboardLayout>
    )
}

import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import EmployeesView from "@/views/dashboard/EmployeesView";

export default function EmployeesPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <EmployeesView />
    </DashboardLayout>
  )
}
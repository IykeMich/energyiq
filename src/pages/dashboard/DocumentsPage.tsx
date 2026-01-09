import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import DocumentsView from "@/views/dashboard/DocumentsView";

export default function DocumentsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <DocumentsView />
    </DashboardLayout>
  )
}
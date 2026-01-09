import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import DashboardOverviewView from "@/views/dashboard/DashboardOverviewView";

export default function DashboardOverviewPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <DashboardOverviewView />
    </DashboardLayout>
  )
}
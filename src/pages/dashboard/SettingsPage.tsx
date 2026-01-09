import { DefaultHeader } from "@/components/header/DefaultHeader";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import SettingsView from "@/views/dashboard/SettingsView";

export default function SettingsPage() {
  return (
    <DashboardLayout headerComponent={<DefaultHeader />}>
        <SettingsView />
    </DashboardLayout>
  )
}
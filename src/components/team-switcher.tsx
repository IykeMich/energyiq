import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import EnergyIQLogo from "@/assets/image/full-logo-image.png";
import Logo from "@/assets/image/logo.png"
export function TeamSwitcher() {
  const { state } = useSidebar();

    return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="mt-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-transparent!"
            >
              <div className="flex aspect-square items-center justify-center rounded-lg">
                {state === "expanded" ? (
                  <img src={EnergyIQLogo} alt="EnergyIQ Logo" className="w-full h-[34px]" />
                ) : (
                  <img src={Logo} alt="EnergyIQ Logo" />
                )}
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NotificationBadge } from "@/components/ui/notification-badge";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { SVGComponent } from "@/type/base";
import { useRouterUtils } from "@/utils/useRouterUtils";
import type { LucideIcon } from "lucide-react";

export function NavMain({
  items,
  extraClass,
  containerExtraClass,
}: {
  items: {
    title: string;
    url: string;
    icon?: SVGComponent | LucideIcon;
    isActive?: boolean;
    badge?: number;
    /** Optional: Array of paths that should keep this nav item active (e.g., child routes) */
    activePaths?: string[];
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  extraClass?: string;
  containerExtraClass?: string;
}) {
  const router = useRouterUtils();
  const currentPath = router.getCurrentPath();
  const { state } = useSidebar();
  
  return (
    <SidebarGroup className={`h-auto ${containerExtraClass ?? ""}`}>
      <SidebarMenu className={`space-y-0 ${extraClass ?? ""}`}>
        {items.map((item) => {
          // Check if current path matches the item URL or any of its active paths
          const isActivePath = currentPath === item.url || 
            (item.activePaths?.some(path => currentPath.startsWith(path)) ?? false);
          
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActivePath || item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem className={`flex flex-row items-center gap-x-2 relative`}>
              <div className={` ${isActivePath ? "flex" : "hidden"} ${state === "expanded" ? "flex" : "hidden"} bg-[#FBC02D]
              w-1.5 h-8 rounded-r-lg absolute -left-2`} />
              <div className={` ${state === "expanded" ? "flex" : ""}  w-full`}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isActivePath}
                    onClick={() => {
                      // Navigate without changing sidebar state
                      // The sidebar state is managed separately via cookie
                      router.navigateTo(item.url);
                    }}
                    tooltip={item.title}
                    className={`tap-effect h-[42px]! ${state === "expanded" ? "ml-4" : "ml-0"}`}
                  >
                    {item.icon && (
                      <item.icon 
                        className={`transition-colors ${isActivePath ? " stroke-white" : "text-gray-400 stroke-gray-400 light:text-[#737373] light:stroke-[#737373]"} ${isActivePath && state === "collapsed" ? "-ml-1" : ""}`}
                      />
                    )}
                    <span 
                      className={`text-sm font-normal leading-6 transition-colors ${
                        !isActivePath ? "text-gray-400 light:text-[#737373]" : ""
                      }`}
                    >
                      {item.title} 
                    </span>
                    {item.badge && <NotificationBadge count={item.badge} />}
                    {(item.items?.length ?? 0) > 0 && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                
                
                {(item.items?.length ?? 0) > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <button 
                              onClick={() => {
                                // Navigate without changing sidebar state
                                router.navigateTo(subItem.url);
                              }}
                              className="w-full text-left"
                            >
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </div>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
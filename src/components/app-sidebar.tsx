import { NavMain } from "@/components/nav-main";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  BarChart3,
  FileText,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";
import * as React from "react";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { StringUtil } from "@/utils/StringUtil";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // TODO: Replace with actual user data from auth/store
  const user = {
    name: "Andrew Franklin",
    email: "andrewfran@gmail.com",
    avatar: "",
  };

  const initials = StringUtil.abbreviateToTwoCharacter(user.name);

  const navMainItems = [
    {
      title: "Dashboard",
      url: RoutesConstant.dashboard.overview.index,
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Distributors",
      url: RoutesConstant.dashboard.distributors.index,
      icon: Users,
      isActive: false,
      items: [],
    },
    {
      title: "Inventory",
      url: RoutesConstant.dashboard.inventory.index,
      icon: Package,
      isActive: false,
      items: [],
    },
    {
      title: "Orders",
      url: RoutesConstant.dashboard.orders.index,
      icon: ShoppingCart,
      isActive: false,
      items: [],
    },
    {
      title: "Financials",
      url: RoutesConstant.dashboard.financials.index,
      icon: DollarSign,
      isActive: false,
      items: [],
    },
    {
      title: "Complaints",
      url: RoutesConstant.dashboard.complaints.index,
      icon: MessageSquare,
      isActive: false,
      items: [],
    },
    {
      title: "Analytics",
      url: RoutesConstant.dashboard.analytics.index,
      icon: BarChart3,
      isActive: false,
      items: [],
    },
    {
      title: "Documents",
      url: RoutesConstant.dashboard.documents.index,
      icon: FileText,
      isActive: false,
      items: [],
    },
    {
      title: "Employees",
      url: RoutesConstant.dashboard.employees.index,
      icon: UserCog,
      isActive: false,
      items: [],
    },
    {
      title: "Sophia",
      url: RoutesConstant.dashboard.sophia.index,
      icon: UserCog,
      isActive: false,
      items: [],     
    }
  ];

  const navSecondaryItems = [
    {
      title: "Settings",
      url: RoutesConstant.dashboard.settings.index,
      icon: Settings,
      isActive: false,
      items: [],
    },
    {
      title: "Log out",
      url: "/logout",
      icon: LogOut,
      isActive: false,
      items: [],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props} className="border border-[#27272A] light:border-[#E5E5E5] border-s-0 bg-[#121212]">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <NavMain items={navMainItems} extraClass="pb-8 border-b border-gray-800 light:border-gray-200" />
        <NavMain items={navSecondaryItems} extraClass="pb-8" />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="bg-[#FBC02D] text-[#121212]">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
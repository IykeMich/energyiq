import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  className?: string;
  noHorizontalPadding?: boolean;
}

export const DashboardLayout = ({
  children,
  headerComponent,
  className,
  noHorizontalPadding = false,
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider       
    style={
      {
        "--sidebar-width": "16rem", // Desktop width
        "--sidebar-width-mobile": "8rem", // Mobile width
      } as React.CSSProperties
    }
    >
      <AppSidebar />
      <SidebarInset className="bg-[#121212]">
        <header className="flex pt-2 md:pt-3 md:pb-3 px-2 shrink-0 items-start md:items-center gap-2 transition-[width,height] 
        ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-auto border-b-[#27272A] light:border-b-[#DEDEDE] border-b">
          <div className="hidden md:flex items-center gap-2">
            <SidebarTrigger className="-ml-1 " />
          </div>
          <div className={"flex-1 pr-1"}>
            <div className="flex md:hidden justify-end items-center gap-2">
              <SidebarTrigger className="-ml-1 mt-1" />
            </div>
            {headerComponent && headerComponent}
          </div>
        </header>
        <div className={` flex flex-1 flex-col gap-4 py-4 ${noHorizontalPadding ? "" : "px-4 lg:px-8"} bg-[#121212] light:bg-[#F6F6FB] ${className} `}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
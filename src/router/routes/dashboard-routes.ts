import type { RouteType } from "@/type/RouteType.ts";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";

import DashboardOverviewPage from "@/pages/dashboard/DashboardOverviewPage";
import DistributorsPage from "@/pages/dashboard/DistributorsPage";
import InventoryPage from "@/pages/dashboard/InventoryPage";
import OrdersPage from "@/pages/dashboard/OrdersPage";
import FinancialsPage from "@/pages/dashboard/FinancialsPage";
import ComplaintsPage from "@/pages/dashboard/ComplaintsPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import DocumentsPage from "@/pages/dashboard/DocumentsPage";
import EmployeesPage from "@/pages/dashboard/EmployeesPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import RecentActivityPage from "@/pages/RecentActivityPage";
// @ts-ignore: No declaration file for SophiaPage
import EnergyProductCreation from "@/pages/SophiaPage";

export const dashboardRoutes: RouteType[] = [
  {
    path: RoutesConstant.dashboard.overview.index,
    name: RoutesConstant.dashboard.overview.index,
    component: DashboardOverviewPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.distributors.index,
    name: RoutesConstant.dashboard.distributors.index,
    component: DistributorsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.inventory.index,
    name: RoutesConstant.dashboard.inventory.index,
    component: InventoryPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.orders.index,
    name: RoutesConstant.dashboard.orders.index,
    component: OrdersPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.financials.index,
    name: RoutesConstant.dashboard.financials.index,
    component: FinancialsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.complaints.index,
    name: RoutesConstant.dashboard.complaints.index,
    component: ComplaintsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.analytics.index,
    name: RoutesConstant.dashboard.analytics.index,
    component: AnalyticsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.documents.index,
    name: RoutesConstant.dashboard.documents.index,
    component: DocumentsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.employees.index,
    name: RoutesConstant.dashboard.employees.index,
    component: EmployeesPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.settings.index,
    name: RoutesConstant.dashboard.settings.index,
    component: SettingsPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.recentActivity.index,
    name: RoutesConstant.recentActivity.index,
    component: RecentActivityPage,
    metadata: { isAuthenticated: true },
  },
  {
    path: RoutesConstant.dashboard.sophia.index,
    name: RoutesConstant.dashboard.sophia.index,
    component: EnergyProductCreation,
    metadata: { isAuthenticated: true }
  }
];
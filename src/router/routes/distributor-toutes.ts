import InviteDistributorPage from "@/pages/distributor/InviteDistributorPage";
import type { RouteType } from "@/type/RouteType";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";

export const distributorRoutes: RouteType[] = [
  {
    path: RoutesConstant.distributor.invite,
    name: RoutesConstant.distributor.invite,
    component: InviteDistributorPage,
    metadata: { isAuthenticated: true },
  },
];
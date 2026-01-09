import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import type { RouteType } from "@/type/RouteType";
import ViewOrderPage from "@/pages/order/ViewOrderPage";

export const orderRoutes: RouteType[] = [
    {
        path: RoutesConstant.order.view,
        name: RoutesConstant.order.view,
        component: ViewOrderPage,
        metadata: { isAuthenticated: true },
    }
]
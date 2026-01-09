import type { RouteType } from "@/type/RouteType.ts";
import {dashboardRoutes} from "@/router/routes/dashboard-routes.ts";
import { distributorRoutes } from "./distributor-toutes";
import { orderRoutes } from "./order-routes";

export const routes =()=>{
    const initRoute = [] as RouteType[];

    return initRoute.concat(
        dashboardRoutes, 
        distributorRoutes,
        orderRoutes
    )
}
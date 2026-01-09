import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { routes } from "@/router/routes";
import type { RouteType } from "@/type/RouteType.ts";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";

const AuthGuard = ({ children }: { children?: React.ReactNode }) => {
  // TODO: Implement authentication guard
  // For now, we'll allow all routes
  return children ? <>{children}</> : <Outlet />;
};

export const Router = () => {
  const authRoutes = routes().filter((route: RouteType) => {
    return route.metadata?.isAuthenticated === true;
  });

  const guestRoutes = routes().filter((route: RouteType) => {
    return route.metadata?.isAuthenticated === false || 
           (route.metadata && !('isAuthenticated' in route.metadata));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          {authRoutes.map((value, index) => {
            const options = value.metadata || {};

            if (options.redirectTo) {
              return (
                <Route
                  key={index}
                  path={value.path}
                  element={<Navigate to={options.redirectTo} replace />}
                />
              );
            }

            return (
              <Route
                key={index}
                path={value.path}
                element={<value.component />}
              />
            );
          })}
        </Route>
        {guestRoutes.map((value, index) => {
          const options = value.metadata || {};

          if (options.redirectTo) {
            return (
              <Route
                key={index}
                path={value.path}
                element={<Navigate to={options.redirectTo} replace />}
              />
            );
          }
          return (
            <Route
              key={index}
              path={value.path}
              element={<value.component />}
            />
          );
        })}
        <Route path="/" element={<Navigate to={RoutesConstant.dashboard.overview.index} replace />} />
        <Route path="*" element={<Navigate to={RoutesConstant.dashboard.overview.index} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
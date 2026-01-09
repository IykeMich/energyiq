import React from "react";

export type RouteType = {
    path: string;
    name: string;
    component: React.ComponentType;
    metadata?: {
        redirectTo?: string;
        type?: string;
        isAuthentication?: boolean;
        isAuthenticated?: boolean;
        requireAdmin?: boolean;
        requireSuperAdmin?: boolean;
        [key: string]: any;
    };
}
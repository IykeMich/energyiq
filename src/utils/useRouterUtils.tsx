import { useNavigate, useLocation, useParams, useSearchParams, type To } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

// Type definitions for better type safety
interface NavigationOptions {
    replace?: boolean;
    state?: any;
    preventScrollReset?: boolean;
    relative?: "route" | "path";
}

interface QueryParamsObject {
    [key: string]: string | null | undefined;
}

interface RouteParams {
    [key: string]: string | undefined;
}

export const useRouterUtils = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams<RouteParams>();
    const [searchParams, setSearchParams] = useSearchParams();

    // Enhanced navigation functions
    const navigateTo = useCallback((path: To, options: NavigationOptions = {}) => {
        navigate(path, {
            replace: options.replace || false,
            state: options.state || null,
            preventScrollReset: options.preventScrollReset,
            relative: options.relative,
            ...options
        });
    }, [navigate]);

    const navigateBack = useCallback((fallbackPath: string = '/') => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallbackPath);
        }
    }, [navigate]);

    const navigateForward = useCallback(() => {
        navigate(1);
    }, [navigate]);

    // Query parameter utilities with better typing
    const getQueryParam = useCallback((key: string, defaultValue: string | null = null): string | null => {
        return searchParams.get(key) || defaultValue;
    }, [searchParams]);

    const getQueryParamAsNumber = useCallback((key: string, defaultValue: number | null = null): number | null => {
        const value = searchParams.get(key);
        if (!value) return defaultValue;
        const parsed = Number(value);
        return isNaN(parsed) ? defaultValue : parsed;
    }, [searchParams]);

    const getQueryParamAsBoolean = useCallback((key: string, defaultValue: boolean | null = null): boolean | null => {
        const value = searchParams.get(key);
        if (!value) return defaultValue;
        return value.toLowerCase() === 'true';
    }, [searchParams]);

    const getQueryParamAsArray = useCallback((key: string, delimiter: string = ',', defaultValue: string[] = []): string[] => {
        const value = searchParams.get(key);
        if (!value) return defaultValue;
        return value.split(delimiter).filter(Boolean);
    }, [searchParams]);

    const setQueryParam = useCallback((key: string, value: string | number | boolean | null | undefined) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === null || value === undefined || value === '') {
            newParams.delete(key);
        } else {
            newParams.set(key, String(value));
        }
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const setMultipleQueryParams = useCallback((paramsObj: QueryParamsObject) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(paramsObj).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const toggleQueryParam = useCallback((key: string, value: string = 'true') => {
        const currentValue = searchParams.get(key);
        if (currentValue === value) {
            removeQueryParam(key);
        } else {
            setQueryParam(key, value);
        }
    }, [searchParams, setQueryParam]);

    const removeQueryParam = useCallback((key: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(key);
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const removeMultipleQueryParams = useCallback((keys: string[]) => {
        const newParams = new URLSearchParams(searchParams);
        keys.forEach(key => newParams.delete(key));
        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

    const clearAllQueryParams = useCallback(() => {
        setSearchParams({});
    }, [setSearchParams]);

    const hasQueryParam = useCallback((key: string): boolean => {
        return searchParams.has(key);
    }, [searchParams]);

    // Path utilities
    const getCurrentPath = useCallback((): string => location.pathname, [location.pathname]);

    const isCurrentPath = useCallback((path: string): boolean => {
        return location.pathname === path;
    }, [location.pathname]);

    const isPathMatch = useCallback((pattern: string): boolean => {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(location.pathname);
    }, [location.pathname]);

    const isExactPathMatch = useCallback((path: string): boolean => {
        return location.pathname === path && location.search === '';
    }, [location.pathname, location.search]);

    const getPathSegments = useCallback((): string[] => {
        return location.pathname.split('/').filter(Boolean);
    }, [location.pathname]);

    const isChildPath = useCallback((parentPath: string): boolean => {
        return location.pathname.startsWith(parentPath) && location.pathname !== parentPath;
    }, [location.pathname]);

    // URL building utilities
    const buildUrl = useCallback((path: string, queryParams: QueryParamsObject = {}): string => {
        const url = new URL(path, window.location.origin);
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
        return url.pathname + url.search;
    }, []);

    const buildExternalUrl = useCallback((baseUrl: string, path: string = '', queryParams: QueryParamsObject = {}): string => {
        const url = new URL(path, baseUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
        return url.toString();
    }, []);

    const buildUrlWithCurrentQuery = useCallback((path: string, additionalParams: QueryParamsObject = {}): string => {
        const currentQuery = Object.fromEntries(searchParams.entries());
        const mergedParams = { ...currentQuery, ...additionalParams };
        return buildUrl(path, mergedParams);
    }, [searchParams, buildUrl]);

    // Route parameter utilities
    const getRouteParam = useCallback((key: string, defaultValue: string | null = null): string | null => {
        return params[key] || defaultValue;
    }, [params]);

    const getRouteParamAsNumber = useCallback((key: string, defaultValue: number | null = null): number | null => {
        const value = params[key];
        if (!value) return defaultValue;
        const parsed = Number(value);
        return isNaN(parsed) ? defaultValue : parsed;
    }, [params]);

    const getAllRouteParams = useCallback((): RouteParams => params, [params]);

    const hasRouteParam = useCallback((key: string): boolean => {
        return key in params && params[key] !== undefined;
    }, [params]);

    // Navigation with query preservation
    const navigateWithQuery = useCallback((path: string, preserveQuery: boolean = true, additionalParams: QueryParamsObject = {}) => {
        if (preserveQuery && searchParams.toString()) {
            const currentQuery = Object.fromEntries(searchParams.entries());
            const mergedParams = { ...currentQuery, ...additionalParams };
            const finalPath = buildUrl(path, mergedParams);
            navigate(finalPath);
        } else if (Object.keys(additionalParams).length > 0) {
            const finalPath = buildUrl(path, additionalParams);
            navigate(finalPath);
        } else {
            navigate(path);
        }
    }, [navigate, searchParams, buildUrl]);

    const refreshPage = useCallback(() => {
        navigate(0);
    }, [navigate]);

    // Advanced navigation patterns
    const navigateWithState = useCallback((path: string, state: any) => {
        navigate(path, { state });
    }, [navigate]);

    const replaceCurrentRoute = useCallback((path: string, preserveQuery: boolean = false) => {
        const finalPath = preserveQuery && searchParams.toString()
            ? buildUrl(path, Object.fromEntries(searchParams.entries()))
            : path;
        navigate(finalPath, { replace: true });
    }, [navigate, searchParams, buildUrl]);

    // Computed values
    const queryObject = useMemo((): Record<string, string> => {
        const obj: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
            obj[key] = value;
        }
        return obj;
    }, [searchParams]);

    const queryCount = useMemo((): number => {
        return Array.from(searchParams.keys()).length;
    }, [searchParams]);

    const fullUrl = useMemo((): string => {
        return window.location.origin + location.pathname + location.search + location.hash;
    }, [location]);

    const currentUrl = useMemo((): string => {
        return location.pathname + location.search + location.hash;
    }, [location]);

    const isHomePage = useMemo((): boolean => {
        return location.pathname === '/';
    }, [location.pathname]);

    // State utilities
    const getLocationState = useCallback(<T = any>(): T | null => {
        return (location.state as T) || null;
    }, [location.state]);

    const hasLocationState = useCallback((): boolean => {
        return location.state !== null && location.state !== undefined;
    }, [location.state]);

    return {
        // Navigation
        navigateTo,
        navigateBack,
        navigateForward,
        navigateWithQuery,
        navigateWithState,
        replaceCurrentRoute,
        refreshPage,

        // Query parameters
        getQueryParam,
        getQueryParamAsNumber,
        getQueryParamAsBoolean,
        getQueryParamAsArray,
        setQueryParam,
        setMultipleQueryParams,
        toggleQueryParam,
        removeQueryParam,
        removeMultipleQueryParams,
        clearAllQueryParams,
        hasQueryParam,
        queryObject,
        queryCount,

        // Path utilities
        getCurrentPath,
        isCurrentPath,
        isExactPathMatch,
        isPathMatch,
        getPathSegments,
        isChildPath,
        isHomePage,

        // URL building
        buildUrl,
        buildExternalUrl,
        buildUrlWithCurrentQuery,

        // Route parameters
        getRouteParam,
        getRouteParamAsNumber,
        getAllRouteParams,
        hasRouteParam,

        // Location info
        location,
        params,
        searchParams,
        fullUrl,
        currentUrl,

        // State utilities
        getLocationState,
        hasLocationState,

        // Raw hooks (for advanced usage)
        navigate,
        setSearchParams
    };
};
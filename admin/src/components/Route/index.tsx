import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { COOKIE_KEY } from "@/constants/cookie";

interface RouteProps {
    redirectPath?: string;
}

export function ProtectedRoute({ redirectPath = "/" }: RouteProps) {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    if (!cookies[COOKIE_KEY.ACCESS_TOKEN]) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}

export function UnProtectedRoute({ redirectPath = "/lottery" }: RouteProps) {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    if (cookies[COOKIE_KEY.ACCESS_TOKEN]) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}

import { Navigate } from "react-router-dom";

import { ACCESS_TOKEN, LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE } from "@/consts";
import { Roles } from "@/models";
import { useAppDispatch } from "@/store";
import { authSlice } from "@/store/slices";

interface ProtectedRouteProps {
    children: JSX.Element,
    allowedRoles: Roles[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const { Id, Role } = parseJwt(accessToken || '');
    const dispatch = useAppDispatch();
    dispatch(authSlice.actions.setAuth({ userId: Id, userRole: Role }));
    if (!accessToken) {
        return <Navigate to={LOGIN_PAGE_ROUTE} replace />;
    } else {
        if (!allowedRoles.includes(Role))
            return <Navigate to={MAIN_PAGE_ROUTE} replace />;
    }
    return <>{children}</>;
}

function parseJwt(token: string) {
    const [, base64Url] = token.split('.');
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default ProtectedRoute;
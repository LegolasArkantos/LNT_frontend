import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequiredAuth = ({ allowedRole }) => {
    const auth = useSelector((state) => state.auth.value);
    const location = useLocation();

    return (
        allowedRole === auth?.role
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequiredAuth;
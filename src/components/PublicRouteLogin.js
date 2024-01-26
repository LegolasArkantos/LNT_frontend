import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";

const PublicRouteLogin = () => {
    const auth = useSelector((state) => state.auth.value);
    const refresh = useRefreshToken();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            }
        }

        verifyRefreshToken();

        if (auth?.role === 'Admin') {
            navigate('/admin-home');
        } else if (auth?.role === "Student"){
            navigate("/student-home");
        } else if (auth?.role === "Teacher") {
            navigate("/teacher-home");
        }


    }, [auth?.role, navigate, refresh])

    return (
        <>
            <Outlet />
        </>
    )

}

export default PublicRouteLogin;
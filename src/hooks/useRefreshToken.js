import { apiPrivate } from "../services/api";
import { useDispatch } from "react-redux";
import { removeAuthValues, setAuthValues } from "../features/auth";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {

        try {
            const response = await apiPrivate.get(
                "/auth/get-access-token", {
                withCredentials: true
            }
            )
            const decodedToken = jwtDecode(response.data.accessToken);
            dispatch(setAuthValues({ role: decodedToken.role, accessToken: response.data.accessToken }));

            return response.data.accessToken
        } catch (error) {
            if (error.response.status === 403) {
                try {
                    const response = await apiPrivate.get(
                        "/auth/logout", {
                        withCredentials: true
                    })
                    if (response.status === 200) {
                        dispatch(removeAuthValues());

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(error);
        }

    }

    return refresh;
}

export default useRefreshToken;
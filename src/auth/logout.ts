import Cookies from "js-cookie";
import {LoginAPI} from "../api/loginApi.ts";
import type {successResponse} from "../dto/successResponse.ts";
import {useNavigate} from "react-router-dom";

export class logoutHandler {
    static async handleLogout(navigate: ReturnType<typeof useNavigate>)  {
        const username = Cookies.get("username");
        if (!username) {
            navigate('/login');
            return;
        }

        LoginAPI.logout().then((logoutResponse: successResponse) => {
            if (logoutResponse.success) {
                Cookies.remove('username');
                Cookies.remove('roomId');
                navigate('/login');
            }
        });
    }

}
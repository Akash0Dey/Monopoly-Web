import DynamicForm from '../form/form1'
import {loginFormConfig} from '../config/login-config'
import {LoginAPI} from "../api/loginApi.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const alertLogin = (isLogged: boolean) => {
        const username = Cookies.get("username");
        const message = isLogged ? 'Login successful ' + username : 'Login failed!.';
        alert(message);
        if (isLogged) {
            navigate("/");
        }
        return isLogged
    }
    const handleSubmit = (formData: Record<string, string>) => {
        console.log('Login data:', formData)
        LoginAPI.isLoggedIn().then(isLogged => {
            if (!isLogged) {
                LoginAPI.login(formData).then(alertLogin);
                return;
            }
            navigate("/");
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <DynamicForm
                config={loginFormConfig}
                onSubmit={handleSubmit}
                submitButtonText="Login"
            />
        </div>
    )
}

export default Login

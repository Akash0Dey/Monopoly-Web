import DynamicForm from '../form/form1'
import {loginFormConfig} from '../config/login-config'
import {LoginAPI} from "../api/loginApi.ts";
import React from "react";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = (formData: Record<string, string>) => {
        console.log('Login data:', formData)
        LoginAPI.isLoggedIn().then(isLogined => {
            if (!isLogined) {
                LoginAPI.login(formData)
                    .then(alert)
                    .then(() => navigate("/"));
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

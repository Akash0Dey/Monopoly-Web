import DynamicForm from '../form/form1'
import { loginFormConfig } from '../config/login-config'
import {LoginAPI} from "../api/loginApi.ts";

const Login = () => {
  const handleSubmit = (formData: Record<string, string>) => {
    console.log('Login data:', formData)
    LoginAPI.login(formData).then(console.log);
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

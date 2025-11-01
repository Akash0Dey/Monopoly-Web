// @ts-ignore
import Cookies from 'js-cookie';
import type {userResponse} from "../types/userResponse.ts";
import {Api} from "./api.ts";

export class LoginAPI {
    static loginUrl = 'api/auth/login';
    static isLoginedUrl = 'api/auth/isLoggedIn';

    static async login(data: Record<string, string>): Promise<string> {
        try {
            const response = await Api.post(Api.url(this.loginUrl), data);
            const userData: userResponse = await response.json();

            Cookies.set('username', userData.username);
            Cookies.set('roomId', userData.roomId);

            return "Welcome " + userData.username;
        } catch (error) {
            console.error('Login failed:', error);
            return "Login failed";
        }
    }

    static async isLoggedIn(): Promise<boolean> {
        try {
            const response = await Api.post(Api.url(this.isLoginedUrl));
            await response.json();
            return false;
        } catch (e) {
            return false
        }
    }
}
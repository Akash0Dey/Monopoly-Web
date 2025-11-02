// @ts-ignore
import Cookies from 'js-cookie';
import type {userResponse} from "../dto/userResponse.ts";
import {Api} from "./api.ts";
import type {successResponse} from "../dto/successResponse.ts";

export class LoginAPI {
    static loginUrl = 'api/auth/login';
    static logoutUrl = 'api/auth/logout';
    static isLoginedUrl = 'api/auth/isLoggedIn';

    static async login(data: Record<string, string>): Promise<boolean> {
        try {
            const response = await Api.post(Api.url(this.loginUrl), data);
            const userData: userResponse = await response.json();

            console.log("Login response:", userData);

            Cookies.set('username', userData.username);
            Cookies.set('roomId', userData.roomId);

            return response.status == 200;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    static async logout(): Promise<successResponse> {
        try {
            const response = await Api.post(Api.url(this.logoutUrl));
            const userData: successResponse = await response.json();
            console.log("Logout response:", userData);
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false};
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
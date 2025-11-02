import {envConfig} from "../config/env.ts";
import Cookies from "js-cookie";

export class Api {
    static baseUrl = envConfig.baseUrl;

    static url(apiUrl: string) : string {
        return this.baseUrl + '/' + apiUrl;
    }

    static post(apiUrl: string, data?: Record<string, string>): Promise<Response> {
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': Cookies.get("username") || '',
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
    }
}
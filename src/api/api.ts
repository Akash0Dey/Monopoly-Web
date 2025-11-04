import {envConfig} from "../config/env.ts";
import Cookies from "js-cookie";

export class Api {
    static baseUrl = envConfig.baseUrl;

    static url(apiUrl: string) : string {
        return this.baseUrl + '/' + apiUrl;
    }

    private static headers() : HeadersInit {
        return {
            'Content-Type': 'application/json',
            'username': Cookies.get("username") || '',
            'roomId': Cookies.get("roomId") || '',
        };
    }

    static post(apiUrl: string, data?: Record<string, string>): Promise<Response> {
        return fetch(apiUrl, {
            method: 'POST',
            headers: this.headers(),
            credentials: "include",
            body: JSON.stringify(data),
        });
    }

    static get(apiUrl: string): Promise<Response> {
        return fetch(apiUrl, {
            method: 'GET',
            headers: this.headers(),
            credentials: "include",
        });
    }
}
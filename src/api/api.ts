import {envConfig} from "../config/env.ts";

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
            },
            body: JSON.stringify(data),
        });
    }
}
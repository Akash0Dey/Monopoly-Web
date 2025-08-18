import { envConfig } from '../config/env';

export class LoginAPI {
    static baseUrl = envConfig.baseUrl;
    static loginUrl = 'api/auth/login';

    static url(apiUrl: string) : string {
        return this.baseUrl + apiUrl;
    }

    static post(apiUrl: string, data: Record<string, string>): Promise<Response> {
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    static login(data: Record<string, string>): Promise<Response> {
        return this.post(this.url(this.loginUrl), data);
    }
}
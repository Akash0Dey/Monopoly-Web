import Cookies from 'js-cookie';
import type {userResponse} from "../dto/userResponse.ts";
import {Api} from "./api.ts";

export class lobbyAPI {
    static joinLobbyUrl = 'api/lobby/join';

    private static setRoomId(userData: userResponse) {
        Cookies.set('roomId', userData.roomId);
        console.log("Welcome " + userData.username + " to lobby " + userData.roomId);
    }

    static async joinLobby(): Promise<boolean> {
        try {
            const response = await Api.post(Api.url(this.joinLobbyUrl));
            const userData: userResponse = await response.json();

            if (!response.ok || userData.roomId == null) {
                console.log("Failed to join lobby");
                return false;
            }

            this.setRoomId(userData);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    static async isGameStarted(): Promise<boolean> {
        return false
    }
}
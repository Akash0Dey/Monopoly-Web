import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {logoutHandler} from "../auth/logout.ts";
import {lobbyAPI} from "../api/lobbyApi.ts";
import type {roomResponse} from "../dto/roomResponse.ts";

const Lobby: React.FC = () => {
    const navigate = useNavigate();
    const roomIdFromCookie = Cookies.get('roomId');

    const [roomId, setRoomId] = useState<string>(roomIdFromCookie || '-');
    const [players, setPlayers] = useState<Array<string>>([]);

    const isMatchStarted = (roomResponse: roomResponse | null): boolean => {
        if (!roomResponse) {
            return false;
        }

        updateLobbyStatus(roomResponse);
        return roomResponse.capacity == roomResponse.currentPlayers;
    };

    const updateLobbyStatus = (roomResponse: roomResponse) => {
        setRoomId(roomResponse.roomId);
        setPlayers(roomResponse.players);
    }

    const pollIfGameStarted = () => {
        const intervalId = setInterval(() => {
            lobbyAPI.fetchLobbyStatus().then(roomResponse => {
                if (isMatchStarted(roomResponse)) {
                    clearInterval(intervalId);
                }
            });
        }, 3000);
    };

    useEffect(() => {
        lobbyAPI.joinLobby().then(isJoined => {
            if (isJoined) {
                pollIfGameStarted();
                return;
            }
            navigate('/');
        });
    }, [navigate]);

    const handleLeaveLobby = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Lobby</h1>
            <p>Players: {players.join(" , ")}</p>
            <p>Room: {roomId}</p>
            <button onClick={handleLeaveLobby}>Back Home</button>
            <button onClick={() => logoutHandler.handleLogout(navigate)}>Logout</button>
        </div>
    );
};

export default Lobby;


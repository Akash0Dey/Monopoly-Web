import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {logoutHandler} from "../auth/logout.ts";
import {lobbyAPI} from "../api/lobbyApi.ts";

const Lobby: React.FC = () => {
    const navigate = useNavigate();
    const usernameFromCookie = Cookies.get('username');
    const roomIdFromCookie = Cookies.get('roomId');

    const [username] = useState<string>(usernameFromCookie || '');
    const [roomId] = useState<string>(roomIdFromCookie || '');

    const pollIfGameStarted = () => {
        const intervalId = setInterval(() => {
            lobbyAPI.isGameStarted().then(isStarted => {
                if (isStarted) {
                    clearInterval(intervalId);
                    navigate('/game');
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
            <p>User: {username}</p>
            {roomId && <p>Room: {roomId}</p>}
            <button onClick={handleLeaveLobby}>Back Home</button>
            <button onClick={() => logoutHandler.handleLogout(navigate)}>Logout</button>
        </div>
    );
};

export default Lobby;


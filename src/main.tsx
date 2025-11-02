import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/Login.tsx'
import Home from './common/home.tsx'
import Lobby from './lobby/Lobby.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/lobby" element={<Lobby />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {logoutHandler} from "../auth/logout.ts";

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    const cookieUsername = Cookies.get('username')
    if (!cookieUsername) {
      navigate('/login')
    } else {
      setUsername(cookieUsername)
    }
  }, [navigate])

  const handleStartGame = () => {
    console.log('awaiting in lobby...');
    navigate('/lobby');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Welcome, {username}!</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleStartGame}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Start Game
        </button>

        <button
          onClick={() => logoutHandler.handleLogout(navigate)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Home

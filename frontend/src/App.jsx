import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import SidebarLayout from './Components/SidebarLayout';
import { useAuth } from './Store/Auth';
import MainTray from './Components/MainTray';
import NewChatForm from './Components/NewChatForm';

function App() {
  const [message, setMessage] = useState("");
  const {setShowNewChat, showNewChat, setOpenUserInfo, isChatOpen} = useAuth()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div className='bg-[#1d1f1f] h-screen flex w-full'>
      {isMobile ? (
        // Mobile: show list OR chat, like WhatsApp
        isChatOpen ? (
          <MainTray/>
        ) : (
          <SidebarLayout/>
        )
      ) : (
        // Desktop: show full layout
        <>
          <Sidebar/>
          <SidebarLayout/>
          <MainTray/>
        </>
      )}
      {showNewChat && (
        <NewChatForm onClose={() => setShowNewChat(false)}/>
      )}
    </div>
  )
}

export default App

import { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import SidebarLayout from './Components/SidebarLayout';
import { useAuth } from './Store/Auth';
import MainTray from './Components/MainTray';
import NewChatForm from './Components/NewChatForm';

function App() {
  const [message, setMessage] = useState("");
  const {setShowNewChat, showNewChat, setOpenUserInfo} = useAuth()

  return (
    <div className='bg-[#1d1f1f] h-screen flex w-full'>
      <Sidebar/>
      <SidebarLayout/>
      <MainTray/>
      {showNewChat && (
        <NewChatForm onClose={() => setShowNewChat(false)}/>
      )}
    </div>
  )
}

export default App

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import SidebarLayout from './SidebarLayout';
import { useAuth } from '../Store/Auth';
import MainTray from './MainTray';
import NewChatForm from './NewChatForm';
import { SignOutButton } from '@clerk/clerk-react';

function ChatApp() {
  const [message, setMessage] = useState("");
  const { setShowNewChat, showNewChat, setOpenUserInfo, isChatOpen } = useAuth();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className='bg-[#1d1f1f] h-screen flex w-full'>
      {isMobile ? (
        // Mobile: show list OR chat, like WhatsApp
        isChatOpen ? (
          <MainTray />
        ) : (
          <SidebarLayout />
        )
      ) : (
        // Desktop: show full layout
        <>
          <SignOutButton><button>Logout</button></SignOutButton>
          <Sidebar />
          <SidebarLayout />
          <MainTray />
        </>
      )}
      {showNewChat && (
        <NewChatForm onClose={() => setShowNewChat(false)} />
      )}
    </div>
  );
}

export default ChatApp;

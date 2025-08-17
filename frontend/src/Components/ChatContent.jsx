import { IoSend } from "react-icons/io5"
import { useAuth } from "../Store/Auth";
// import {toast} from 'react-toastify'
import { io } from "socket.io-client";
import { useEffect } from "react";
import { MessageBox } from "react-chat-elements";
import { useRef } from "react";
const socket = io("https://chatapp-xmdn.onrender.com", {
  auth: { serverOffset: 0 } // Optional: for message recovery
});

const ChatContent = () => {
  const sentMessageIds = useRef(new Set());
    const {chatInput, setChatInput, messages, setMessages} = useAuth()
    
    useEffect(() => {
    socket.on("chat message", (msg, id) => {
      if (sentMessageIds.current.has(id)) return;
      setMessages(prev => {
      if (prev.some(m => m.id === id)) return prev;
      return [...prev, { text: msg, id, isUser: false }];
    });
    });
    return () => socket.off("chat message");
    }, []);

    const sendMessage = () => {
        if (chatInput.trim()) {
      setMessages(prev => [...prev, { text: chatInput, id: Date.now(), isUser: true }]);
      sentMessageIds.current.add(id);
      socket.emit("chat message", chatInput, Date.now(), () => {});
      setChatInput("");
    } 
    }
  return (
    <div className="w-full h-11/12 flex flex-col">
        <div className="relative flex-11/12 w-full h-[30vh] overflow-y-scroll text-black">
                    {messages.map((msg, idx) => (
                      <MessageBox
                        key={idx}
                        position={msg.isUser ? 'right' : 'left'}
                        type="text"
                        title={msg.isUser ? "You" : "Wassup User"}
                        text={msg.text}
                        date={new Date()}
                        notch={true}
                        avatar={msg.isUser ? "/logo.png" : "/logo.png"}
                        titleColor="#8717ae"
                        className=""
                      />
                    ))}
                  </div>
        <div className="flex-1/12 border-1 flex items-center justify-center"><input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => {if(e.key === "Enter") {e.preventDefault(); sendMessage()}}} className="w-11/12 h-full focus:outline-none focus:border-none" type="text" /><IoSend  onClick={sendMessage}/></div>
    </div>
  )
}

export default ChatContent

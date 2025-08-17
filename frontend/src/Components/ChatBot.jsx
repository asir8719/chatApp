import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAuth } from "../Store/Auth";
import { MessageBox } from "react-chat-elements";

const ChatBot = () => {
    const {selectedChat, chatInput, setChatInput, messages, setMessages} = useAuth()
    const sendMessage = async () => {
      setChatInput("")
      setMessages([...messages, {text: chatInput, isUser: true}])
      const response = await fetch("https://chatapp-xmdn.onrender.com/api/wassupai", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: chatInput}),
      })
      const data = await response.json()
      setMessages([...messages, {text: chatInput, isUser: true}, {text: data.reply, isUser: false}])
    }

    return (
      <div className="h-[90vh] w-full flex flex-col items-center">
          <div className="relative flex-11/12 w-full h-[30vh] overflow-y-scroll text-black">
            {messages.map((msg, idx) => (
              <MessageBox
                key={idx}
                position={msg.isUser ? 'right' : 'left'}
                type="text"
                title={msg.isUser ? "You" : "Wassup AI"}
                text={msg.text}
                date={new Date()}
                notch={true}
                avatar={msg.isUser ? "/logo.png" : "/logo.png"}
                titleColor="#8717ae"
                className=""
              />
            ))}
          </div>
            <div style={{boxShadow: '0 -5px 35px rgba(255, 193, 7, 1)'}} className="flex z-30 text-black bg-amber-50 inset-ring-2 inset-ring-blue-500 flex-col mb-4 w-9/12 rounded-4xl p-4">
              <input onKeyDown={e => {if(e.key === "Enter") {e.preventDefault(); sendMessage();}}} value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask Wassup AI" type="text" name="chatInput" id="chatInput" className="focus:outline-none focus:border-none pl-2 pointer-events-auto w-full h-full rounded-t-4xl"/>
              <span className="self-end scale-150 w-8"><button type="submit" onClick={sendMessage}><IoSend/></button></span>
            </div>
        </div>
  );
}

export default ChatBot;

import { useState } from "react"
import { useAuth } from "../Store/Auth"
import { PiPhoneLight } from "react-icons/pi";
import ChatBot from "./ChatBot";
import { MessageBox, MessageList } from 'react-chat-elements';
import ChatContent from "./ChatContent";

const TrayUpperPanel = () => {
  const {chats, selectedChat, setOpenUserInfo} = useAuth()
  return (
    <div className="flex justify-between items-center h-15 px-8 bg-[#2d2d2d] border-l-1">
      <div className="flex gap-x-4 items-center w-full text-white font-medium" onClick={() => setOpenUserInfo(true)}>
        <img className="rounded-full bg-amber-50 w-10 h-10 object-cover" src={selectedChat.src || "/image.png"} alt="profilePic"/>
        <p>{selectedChat.Name || selectedChat.number}</p>
      </div>
      {selectedChat.Name !== "Wassup AI" && <div className="text-white bg-[#3f3f3f] cursor-pointer flex justify-center rounded-md items-center w-10 h-10">
        <PiPhoneLight/>
      </div>}
    </div>
  )
}

const UserInfo = () => {
  const {setOpenUserInfo, selectedChat, handleInputChange} = useAuth()
  return (
    <div onClick={() => setOpenUserInfo(false)} className="inset-0 fixed flex pl-14 pt-3 justify-center z-600 bg-[#00000062] bg-opacity-40">
      <div onClick={e => e.stopPropagation()} className="w-md flex flex-col items-center justify-center gap-y-5 text-white h-9/12 rounded-md bg-[#444444] ">
        <input style={{backgroundImage: `url(${selectedChat?.src ? selectedChat.src : "/image.png"})`}} id="src" type="file" accept="image/*" name="src" onChange={handleInputChange} className="w-28 h-28 rounded-full bg-cover bg-amber-50 bg-center"/>
        <p>{selectedChat.Name || selectedChat.number}</p>
      </div>
    </div>
  )
}

const MainTray = () => {
  
  const {chatInput, active, isChatOpen, openUserInfo, isChatBotOpen, setIsChatBotOpen} = useAuth()
  return (
    <div className="bg-[#323434] w-full">
    {!isChatOpen ? (
      <div className="h-full w-full flex flex-col justify-center items-center gap-y-7 text-gray-400">
        <img src="/logo.png" alt="logo" className="w-26 opacity-40" />
        <h1 className="text-4xl justify-center flex">Wassup for Web</h1>
        <p>Send and recieve messages without keeping your phone online.</p>
      </div>
      ) : (
      <div className="h-full w-full flex flex-col">
        <TrayUpperPanel/>
        {openUserInfo && <UserInfo/>}
        {isChatBotOpen ? <ChatBot/> : <ChatContent/>}
      </div>
    )}
  </div>
  )
}

export default MainTray
import { CiStar } from "react-icons/ci";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiChatVoiceAiLine } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../Store/Auth";
import { FiMenu } from "react-icons/fi";
import ChatBot from "./ChatBot";

const Sidebar = () => {
  
  const {active, setActive, icons, setSelectedChat, setIsChatOpen, setIsChatBotOpen} = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleIconClick = (label) => {
    if(label === "Menu") {
      setExpanded((prev) => !prev)
    }
    else {
      setActive(label);
      setIsChatBotOpen(false)
    }
  }
 
  return (
    <div className={`${expanded ? "expanded" : "nexpanded"}  py-4 pl-2 h-full p-1 bg-[#1d1f1f] text-white w-13 flex flex-col justify-between`}>
      <div className="flex flex-col gap-1.5">
        <div className="w-9 flex gap-6 items-center">
          <img src="./logo.png" alt="" />
          {expanded && (<span className="font-medium text-2xl">Wassup</span>)}
        </div>
        <div className={`sdbrbtn`} onClick={() => handleIconClick("Menu")}><span className="flex"><button><FiMenu /></button>{expanded && (<span>Menu</span>)}</span></div>
        {icons.map((item, index) => (
          <div key={index}
          className={`sdbrbtn ${active === item.label ? "active" : ""}`}
          onClick={() => handleIconClick(item.label)}>
            <span className="flex">
            <button>{item.icon}</button>
            {expanded && (<span>{item.label}</span>)}
            </span>
          </div>
        ))}
        <div className={`sdbrbtn`} onClick={() => {setActive("ChatBot"); setSelectedChat({Name: "Wassup AI", src: "/logo.png"}); setIsChatOpen(true); setIsChatBotOpen(true)}}><span className="flex"><button><RiChatVoiceAiLine/></button>{expanded && (<span>Wassup AI</span>)}</span></div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className={`sdbrbtn ${active === "Starred Messages" ? "active" : ""}`} onClick={() => setActive("Starred Messages")}><span className="flex"><button><CiStar/></button>{expanded && (<span>Starred messages</span>)}</span></div>
        <div className={`sdbrbtn ${active === "Archived Chats" ? "active" : ""}`} onClick={() => setActive("Archived Chats")}><span className="flex"><button><HiOutlineArchiveBox/></button>{expanded && (<span>Archived chats</span>)}</span></div>  
        <hr className="text-zinc-600"/>
        <div className={`sdbrbtn ${active === "Setting" ? "active" : ""}`} onClick={() => setActive("Setting")}><span className="flex"><button><IoSettingsOutline/></button>{expanded && (<span>Settings</span>)}</span></div>
        <div className={`sdbrbtn ${active === "Profile" ? "active" : ""}`} onClick={() => setActive("Profile")}><span className="flex"><button><RiAccountCircleFill/></button>{expanded && (<span>Profile</span>)}</span></div>
      </div>
    </div>
  )
}

export default Sidebar
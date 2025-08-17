import { useState } from "react"
import { useAuth } from "../Store/Auth"
import Calls from "./Calls"
import Chat from "./Chat"
import { SlNote } from "react-icons/sl";
import { LiaSearchSolid } from "react-icons/lia";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { VscListFilter } from "react-icons/vsc";
import Starred from "./Starred"
import Archive from "./Archive";
import NewChatForm from "./NewChatForm";

const SidebarLayout = () => {

    const [search, setSearch] = useState("")
    
    const {active, chats, setShowNewChat, setIsChatBotOpen} = useAuth()
    const handleNewChat = () => {
        setShowNewChat(true)
    }
    const renderContent = () => {
        switch (active) {
            case "Chats":
                return <Chat search={search}/>

            case "Calls":
                return <Calls/>

            case "Starred Messages":
                return <Starred/>

            case "Archived Chats":
                return <Archive/>
        
        default:
                return <Chat search={search}/>
        }
    }

  return (
    <div className="w-lg bg-[#2d2d2d] text-white p-3">
        <div className="flex flex-col gap-y-4 mb-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">{active === "" ? "Chats" : active}</h1>
                <div className="flex gap-5">
                    <div onClick={() => handleNewChat()} data-tooltip-id="NewChat" data-tooltip-place="right" data-tooltip-delay-show="200" data-tooltip-content="New Chat" className="hvrbtn p-2 cursor-pointer rounded-md">
                        <SlNote/>
                        <ReactTooltip id="NewChat" />
                    </div>
                    <div data-tooltip-id="Filter" data-tooltip-place="right" data-tooltip-delay-show="200" data-tooltip-content="Filter chats by" className="hvrbtn p-2 cursor-pointer rounded-md">
                        <VscListFilter/>
                        <ReactTooltip id="Filter"/>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-full">
                 <LiaSearchSolid className="absolute scale-75"/>
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="pl-6 h-7 w-full rounded-sm border-b-2 border-b-emerald-400 bg-[#404040]"/>
            </div>
        </div>
        <div className="overflow-y-scroll h-[84vh]">
            {renderContent()}
        </div>
    </div>
  )
}

export default SidebarLayout
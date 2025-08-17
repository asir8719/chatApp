import { createContext, useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsChatText } from "react-icons/bs";
import { PiPhoneLight } from "react-icons/pi";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [active, setActive] = useState("");
    const [showNewChat, setShowNewChat] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [selectedChat, setSelectedChat] = useState(null)
    const [openUserInfo, setOpenUserInfo] = useState(false)
    const [form, setForm] = useState({Name: "", src: "", number: ""})
    const [chats, setChats] = useState([
        {src: "./logo.png", Name: "Asir Khan", number: "9608376930"}
    ])
    const [isChatBotOpen, setIsChatBotOpen] = useState(true)
    const [chatBot, setChatBot] = useState({name: "Wassup AI",src: "/logo.png"})
    const [chatInput, setChatInput] = useState('')
    const [messages, setMessages] = useState([])

    const icons = [
    {icon: <BsChatText />, label: "Chats"},
    {icon: <PiPhoneLight />, label: "Calls"}
    ];

    const handleInputChange = (e) => {
    if (e.target.type === "file") {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({
                    ...form,
                    src: reader.result, // Data URL
                })
                setSelectedChat(prev => prev ? {...prev, src: reader.result} : prev)
                setChats(prevChats => 
                    selectedChat ? prevChats.map(chat => 
                        chat.number === selectedChat.number ? {...chat, src: reader.result} : chat) : prevChats)
            };
            reader.readAsDataURL(file);
        }
    } else {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
}


    return(<UserContext.Provider value={{active, setActive, icons, chats, setChats, showNewChat, setShowNewChat, isChatOpen, setIsChatOpen, selectedChat, setSelectedChat, openUserInfo, setOpenUserInfo ,handleInputChange, form, setForm, chatBot, isChatBotOpen, setIsChatBotOpen, chatInput, setChatInput, messages, setMessages}}>{children}</UserContext.Provider>)
}

export const useAuth = () =>{
    return useContext(UserContext)
}
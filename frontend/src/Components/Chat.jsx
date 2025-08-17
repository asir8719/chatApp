import { useAuth } from "../Store/Auth"

const Chat = ({search = ""}) => {

  const {chats, setIsChatOpen, selectedChat, setSelectedChat, isChatOpen, setIsChatBotOpen, active, setActive}  = useAuth()
  const filteredChats = chats.filter(chat =>
    chat.Name?.toLowerCase().includes(search.toLowerCase()) ||
    chat.number?.toString().includes(search)
  )

  return (
    <div>
      {filteredChats.map((chats, idx) => (
        <div onClick={() => {setIsChatOpen(true); setIsChatBotOpen(false); setSelectedChat(chats);}} key={idx} className={`${selectedChat?.number === chats.number ? 'active' : ''} flex items-center gap-x-5 p-2.5 rounded-md hvrbtn`}>
          <img className="w-10 h-10 object-cover rounded-full bg-amber-50" src={chats.src || "/image.png"} alt={chats.name} />
          <h1>{chats.Name || chats.number}</h1>
        </div>
      ))}
    </div>
  )
}

export default Chat
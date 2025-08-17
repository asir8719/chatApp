import { useState } from "react"
import { useAuth } from "../Store/Auth"

const NewChatForm = ({onClose}) => {

    const {chats, setChats, handleInputChange, form, setForm} = useAuth()
    
    const handleSubmitNewChat = (e) => {
        e.preventDefault()
        setChats([...chats, form])
        setForm({ Name: "", src: "", number: "" });
        onClose()
    }
    

  return (
    <div className="fixed inset-0 bg-[#00000062] bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
        <div onClick={e => e.stopPropagation()} className="w-xs h-[32rem] flex flex-col justify-around p-4 space-y-10 bg-[#323434] text-white form rounded-xl">
            <h1 className="text-xl font-medium mb-5">New contact</h1>
            <form className="flex flex-col gap-y-7" onSubmit={handleSubmitNewChat}>  
                <div className="flex justify-center"><input id="src" type="file" accept="image/*" name="src" onChange={handleInputChange} className="w-28 h-28 rounded-full bg-[url(/image.png)] bg-cover bg-center"/></div>
                <div><label htmlFor="name">Full Name</label><input id="name" type="text" name="Name" value={form.Name} onChange={handleInputChange} className="mt-2 pl-6 h-7 w-full rounded-sm border-b-2 border-b-emerald-400 bg-[#404040]"/></div>
                <div><label htmlFor="number">Phone Number</label><input id="number" required type="number" name="number" value={form.number} onChange={handleInputChange} className="mt-2 pl-6 h-7 w-full rounded-sm border-b-2 border-b-emerald-400 bg-[#404040]"/></div>
                <div><button className="bg-[#21c063d9]  rounded-md py-1 px-12" type="submit">Save</button></div>
            </form>
        </div>
    </div>
  )
}

export default NewChatForm
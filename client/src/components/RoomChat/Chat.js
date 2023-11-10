import React, { useEffect, useState } from "react";
import Search from "./Search";
import ChatList from "./ChatList";
import NewChat from "./ChatMessage";
import Sidebar from "../SideBar";


function Chat() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const class_id = localStorage.getItem('class_id')
  console.log(class_id)

  useEffect(() => {
    fetch("/chats")
      .then((r) => r.json())
      .then((allChats) => {
        // Log the class_id and allChats for debugging
        console.log("class_id:", class_id);
        console.log("allChats:", allChats);
  
        // Filter chats based on class_id
        const filteredChats = allChats.filter((chat) => chat.class_id === class_id);
        console.log("filteredChats:", filteredChats);
  
        setChats(filteredChats);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, [class_id]);

  function handleAddChat(newChat) {
    setChats([...chats, newChat]);
  }

  function handleDeleteChat(id) {
    const updatedChat = chats.filter((chat) => chat.id !== id);
    setChats(updatedChat);
  }

  function handleUpdateChat(updatedChatObj) {
    const updatedChat = chats.map((chat) => {
      if (chat.id === updatedChatObj.id) {
        return updatedChatObj;
      } else {
        return chat;
      }
    });
    setChats(updatedChat);
  }

  const displayedChats = chats.filter((chat) =>
    chat.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        <h1 className="text-blue-600 text-2xl mb-2 font-bold text-center">Chat Room</h1>
          <Search search={search} onSearchChange={setSearch} />
          <ChatList
            chats={displayedChats}
            onChatDelete={handleDeleteChat}
            onUpdateChat={handleUpdateChat}
          />
          <NewChat onAddMessage={handleAddChat} />
        </div>
      </div>
  );
}

export default Chat;

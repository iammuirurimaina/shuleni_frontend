import React, { useEffect, useState } from "react";
import Search from "./Search";
import ChatList from "./ChatList";
import NewChat from "./ChatMessage";
import Sidebar from "../SideBar";


function RoomChat() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/chats")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.statusText}`);
        }
        return response.json();
      })
      .then((chats) => {
        console.log("Fetched chats:", chats);
        setChats(chats);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
        // Handle the error as needed, e.g., show a user-friendly message
      });
  }, [])

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
            chats = {displayedChats}
            // chats = {chats}
            onChatDelete={handleDeleteChat}
            onUpdateChat={handleUpdateChat}
          />
          <NewChat onAddMessage={handleAddChat} />
        </div>
      </div>
  );
}

export default RoomChat;
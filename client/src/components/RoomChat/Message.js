import React, { useState } from "react";
import EditMessage from "./EditChats";

function Message({ chat, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);

  // const { id, username, body, created_at: createdAt } = chat;

  // const timestamp = new Date(createdAt).toLocaleTimeString();

  // const isCurrentUser = currentUser.username === username;

  function handleDeleteClick() {
    fetch(`/chat/${chat.id}`, {
      method: "DELETE",
    });

    onMessageDelete(chat.id);
  }

  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li className="p-2 mb-2 border border-gray-300 p-2 mb-2 rounded-lg w-fit">
      <div className="text-left">   
          <div className="text-black ">
             <span className="mr-2 font-semibold">{chat.name}</span>
          </div> 
      </div>
      <div className="text-center mb-2">
        <button
          className="text-blue-600 hover:text-blue-700 mr-2"
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          ✏️ 
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDeleteClick}
        >
          🗑
        </button>
      </div>
      {isEditing ? (
        <EditMessage id={chat.id} body={chat.message} onUpdateMessage={handleUpdateMessage} />
      ) : (
        <div>
          <div>
            <p className="">{chat.message}</p>
            {chat.created_at}
          </div>
          <div>
            
          </div>
        </div>
        
        
      )}
    </li>
  );
}

export default Message;

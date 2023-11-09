import React from "react";
import Message from "./Message";

function ChatList({ chats, onChatDelete, onUpdateChat }) {
  return (
    <div className="border border-gray-200 p-2 h-3/4 overflow-y-scroll rounded-xl">
      <ul>
        {chats.map((chat) => (
          <Message
            key={chat.id}
            chat={chat}
            currentUser={4}
            onMessageDelete={onChatDelete}
            onUpdateMessage={onUpdateChat}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatList;

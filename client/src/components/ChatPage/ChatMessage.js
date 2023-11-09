import React, { useState } from "react";

function NewChat({ onAddMessage }) {
  const [body, setBody] = useState("");
  const user_id = localStorage.getItem('user_id');


  function handleSubmit(e) {
    e.preventDefault();

    fetch("/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        class_id: 12,
        sender: user_id,
        message: body,
      }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        onAddMessage(newMessage);
        setBody("");
      });
  }

  return (
    <form className="mt-2 pb-6 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border border-solid p-2 w-4/5 rounded-xl border-gray-300 focus:outline-none focus:border-solid focus:border-blue-600"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white w-1/5 ml-2 rounded-xl"
      >
        Send <i class="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}

export default NewChat;

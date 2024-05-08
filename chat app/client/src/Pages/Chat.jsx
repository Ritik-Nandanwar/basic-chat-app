import React, { useContext, useEffect, useState } from "react";
import socketRef from "../socket/Socket";
import Messages from "../Components/Messages";
import { messageContext } from "../Context/MessageContext";

const Chat = ({ userName, email, roomId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    socketRef.emit("send-message", { message, userName, email, roomId });
  };
  return (
    <>
      <h1>{userName}</h1>
      <div className="h-[80vh] w-[70vw] mx-auto p-4 my-2 bg-slate-600 text-white">
        <Messages />
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          className="p-2 bordered border-black text-xl outline rounded-l-lg"
        />
        <button
          className="p-3 bg-green-300 text-white text-xl rounded-r-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;

import React, { useEffect, useState } from "react";
import socketRef from "../socket/Socket";
const Chat = ({ userName, email }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    socketRef.emit("send-message", { message, userName, email });
    setAllMessages(() => [...allMessages, message]);
  };
  useEffect(() => {
    socketRef.on("receive-message", (data) =>
      console.log("from message sent ", data)
    );
  }, []);
  return (
    <>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
          className="p-2 bordered border-black text-xl outline"
        />
        <button
          className="p-3 bg-green-300 text-white text-xl"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      <h1>{userName}</h1>
      <div className="">
        {allMessages.map((msg) => (
          <h6 key={msg}>{msg}</h6>
        ))}
      </div>
    </>
  );
};

export default Chat;

import React, { useContext, useEffect, useState } from "react";
import socketRef from "../socket/Socket";
import Messages from "../Components/Messages";
import { messageContext } from "../Context/MessageContext";
const Chat = ({ userName, email, roomId }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  var { counter, setCounter } = useContext(messageContext);

  console.log(counter);
  const handleCount = () => {
    setCounter(counter + 1);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    socketRef.emit("send-message", { message, userName, email, roomId });
    // setAllMessages(() => [...allMessages, message]);
  };
  useEffect(() => {
    socketRef.on("receive-message", (data) => {
      console.log("from message sent ", data);
      setAllMessages(() => [...allMessages, data.message]);
    });
  }, []);
  return (
    <>
      <h1>{userName}</h1>
      <div className="h-[80vh] w-[70vw] mx-auto p-4 bg-slate-600 text-white">
        <Messages allMessages={allMessages} setAllMessages={setAllMessages} />
      </div>
      <button className="p-5 border-red-500 outline" onClick={handleCount}>
        increaser counrter
      </button>
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
    </>
  );
};

export default Chat;

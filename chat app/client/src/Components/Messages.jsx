import React, { useContext, useEffect } from "react";
import socketRef from "../socket/Socket";
import { messageContext } from "../Context/MessageContext";

const Messages = () => {
  var { allMessages, setAllMessages } = useContext(messageContext);
  var { currentUser } = useContext(messageContext);
  var currentUserSame;
  useEffect(() => {
    socketRef.on("receive-message", (data) => {
      console.log("data of message ", data);

      setAllMessages((allMessages) => [
        ...allMessages,
        { message: data.message, userName: data.userName },
      ]); //if we don't take `allMessages` as props in the callback function then useContext is refreshing the state of `allMessages`
      console.log("allMessages arr => ", allMessages);
    });
    return () => socketRef.disconnect();
  }, []);
  return (
    <>
      {allMessages.map((msg) => (
        <h1
          key={Math.random() * 10000}
          className="p-2 bg-slate-700 my-2 text-white text-end"
          style={{
            textAlign:
              localStorage.getItem("currentUserName") === msg.userName
                ? "end"
                : "start",
          }}
        >
          {msg.message}
        </h1>
      ))}
    </>
  );
};

export default Messages;

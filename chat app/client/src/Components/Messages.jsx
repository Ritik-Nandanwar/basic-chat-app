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
        <div
          key={Math.random() * 10000}
          className="p-2  bg-slate-700 my-2 text-white text-end"
          style={{
            textAlign:
              localStorage.getItem("currentUserName") === msg.userName
                ? "end"
                : "start",
          }}
        >
          <p className="text-slate-400">
            {currentUser == msg.userName ? "you" : msg.userName} :{" "}
            <span className="text-white">{msg.message}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default Messages;

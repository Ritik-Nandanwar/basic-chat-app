import { useState } from "react";
import { messageContext } from "./MessageContext";

const MessageContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [allMessages, setAllMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("user@test.com");
  const [userName, setUserName] = useState("not_unknown");
  const [showChatInput, setShowChatInput] = useState(false);
  return (
    <messageContext.Provider
      value={{
        counter,
        setCounter,
        allMessages,
        setAllMessages,
        roomId,
        setRoomId,
        email,
        setEmail,
        userName,
        setUserName,
        showChatInput,
        setShowChatInput,
      }}
    >
      {children}
    </messageContext.Provider>
  );
};
export default MessageContextProvider;

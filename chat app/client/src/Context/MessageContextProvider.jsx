import { useState } from "react";
import { messageContext } from "./MessageContext";

const MessageContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <messageContext.Provider value={{ counter, setCounter }}>
      {children}
    </messageContext.Provider>
  );
};
export default MessageContextProvider;

import React from "react";

const Messages = (allMessages, setAllMessages) => {
  console.log(allMessages);
  return (
    <>
      {/* {allMessages.map((msg) => (
        <h1 key={Math.random() * 10000}>{msg}</h1>
      ))} */}
      <button onClick={() => setAllMessages("neowrfweoih")}>Cll</button>
    </>
  );
};

export default Messages;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
function App() {
  const socket = useMemo(() => io("http://localhost:8080"), []);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to ", socket.id);
      setSocketId(socket.id);
    });
    socket.on("send-message", (message) => {
      setAllMessages((allMessages) => [...allMessages, message]);
    });
    // socket.on("send-message", ({ data }) => {
    //   console.log(data);
    // });
    socket.on("user-joined-room", (data) => {
      console.log(data);
    });
    return () => socket.disconnect();
  }, []);
  const clickHandler = (e) => {
    if (!roomId) {
      window.alert("Join a room");
    }
    e.preventDefault();
    socket.emit("clickclack", "ciiieie");
    socket.emit("receive-message", { message, roomId });
  };
  const handleChange = (e) => {
    console.log(message);
    setMessage(e.target.value);
  };
  const handleRoomIdChange = (e) => {
    console.log("roomId ", roomId);
    setRoomId(e.target.value);
    socket.emit("join-room", roomId);
  };
  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", { socketId, roomId });
  };
  return (
    <>
      <div className="container" style={{ maxWidth: "720px" }}>
        {allMessages.map((msg) => (
          <h4 key={msg} className="card p-2">
            {msg}
          </h4>
        ))}
      </div>
      <form
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "720px",
        }}
      >
        <hr />
        <input
          type="text"
          value={message}
          className="grey lighten-4 "
          onChange={handleChange}
        />
        <button className="btn green" onClick={clickHandler}>
          Send
        </button>
      </form>
      <form
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "720px",
        }}
      >
        <hr />
        <input
          type="text"
          value={roomId}
          className="grey lighten-4"
          onChange={handleRoomIdChange}
          placeholder="Enter room ID"
        />
        <button className="btn green" onClick={joinRoomHandler}>
          Join_Room
        </button>
      </form>
    </>
  );
}

export default App;

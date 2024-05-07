import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JoinRoom from "./Pages/JoinRoom";
import Chat from "./Pages/Chat";
import io from "socket.io-client";
import { useMemo } from "react";
const App = () => {
  const socket = io.connect("http://localhost:8080");
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" socket={socket} element={<JoinRoom />} />
          {/* <Route exact path="/chat" element={<Chat />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;

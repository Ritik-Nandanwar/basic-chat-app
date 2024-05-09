import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import socketRef from "../socket/Socket";
import Chat from "./Chat";
import { messageContext } from "../Context/MessageContext";
const JoinRoom = () => {
  //   const socket = useMemo(() => io("http://localhost:8080"), []);
  const { roomId, setRoomId } = useContext(messageContext);
  const { email, setEmail } = useContext(messageContext);
  const { userName, setUserName } = useContext(messageContext);
  const { showChatInput, setShowChatInput } = useContext(messageContext);
  var { currentUser, setCurrentUser } = useContext(messageContext);
  //   console.log(.connected);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(socketRef.id);
    socketRef.on("connect", () => {
      console.log("Helloo");
    });
    socketRef.on("joined-room", (data) => {
      console.log("JOINED A ROOM G");
    });
    return () => {
      socketRef.disconnect();
      localStorage.removeItem("currentUserName");
    };
  }, []);
  const handleJoinRoom = (e) => {
    if (roomId == "" || email == "" || userName == "") {
      window.alert("Fill out all the fields");
      e.preventDefault();
    } else {
      e.preventDefault();
      console.log("Ddd");
      console.log(roomId, " ", email, " ", userName);
      var userToJoinRoom = {
        roomId,
        email,
        userName,
        socketId: socketRef.id,
      };
      socketRef.emit("join-room", userToJoinRoom);
      setShowChatInput(true);
      setCurrentUser(userName);
      localStorage.setItem("currentUserName", userName);
      // navigate("/chat");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomId = (e) => {
    setRoomId(e.target.value);
  };
  return (
    <>
      {showChatInput ? (
        <Chat userName={userName} email={email} roomId={roomId} />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <form action="" className="flex flex-col">
            <input
              type="text"
              name="Room Id"
              id=""
              value={roomId}
              onChange={handleRoomId}
              placeholder="Enter Room ID"
              className="border border-black p-2"
            />
            <input
              type="email"
              name=""
              id=""
              onChange={handleEmail}
              value={email}
              placeholder="Enter Email ID"
              className="border border-black p-2"
            />
            <input
              type="text"
              name=""
              id=""
              onChange={handleUsername}
              value={userName}
              placeholder="Enter your User name"
              className="border border-black p-2"
            />
            <button
              className="border border-black p-2 bg-black mt-2 text-white text-xl font-bold"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default JoinRoom;

import { io } from "socket.io-client";

const socketRef = io("http://localhost:8080");

export default socketRef;

const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Initiate socket connection
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    METHODS: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("new conn ,", socket.id);
  socket.on("clickclack", (p) => {
    console.log(p);
  });
  socket.on("receive-message", ({ message, roomId }) => {
    console.log(message);
    socket.to(roomId).emit("send-message", message);
  });
  socket.on("join-room", ({ socketId, roomId }) => {
    socket.join(roomId);
    socket
      .to(roomId)
      .emit("user-joined-room", `a new user joined the room ${socketId}`);
  });
});

//Routes
app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});
//Listening on port 8080
server.listen(8080, () => {
  console.log("LISTENING");
});

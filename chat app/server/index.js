//Imports
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Constants
const PORT = 8080;

//Socket stuff
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    METHODS: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("New Connections");
  socket.on("join-room", (data) => {
    console.log(data);
    socket.join(data.roomId);
    socket.to(data.roomId).emit("joined-room", data.email);
  });
  socket.on("send-message", (data) => {
    console.log("received data ", data);
    io.to(data.roomId).emit("receive-message", data);
  });
});

//Initialize the server
server.listen(8080, () => {
  console.log(`listening on ${PORT}`);
});

//Routes
app.get("/", (req, res) => {
  res.send({ message: "Hello from the homepage of the backend" });
});

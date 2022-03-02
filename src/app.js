const express = require("express");
const app = express();
const path = require("path");

const http = require("http").createServer(app);

const PORT = -process.env.PORT || 3000;

const indexPath = path.join(__dirname, "../public/index.html");
const staticPath = path.join(__dirname, "../public");

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

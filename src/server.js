import http from "http";
// import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { Server } from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    setTimeout(() => {
      done("안녕 난 서버야!"); // back에서 실행하고 front에 보여주는 함수
    }, 10000);
    console.log(msg);
  });
});

/* 
const wss = new WebSocketServer({ server });
const sockets = [];
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected to the Browser ❌")); // 브러우저를 껐을때
  socket.on("message", (message) => {
    const messageString = message.toString("utf8");
    const messageObj = JSON.parse(messageString);

    switch (messageObj.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${messageObj.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = messageObj.payload;
        break;
    }
  });
});
 */
httpServer.listen(3000, handleListen);

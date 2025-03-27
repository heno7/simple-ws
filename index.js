import { createServer } from "http";
import { createReadStream } from "fs";
import { WebSocketServer } from "ws";

const server = createServer((req, res) => {
  const stream = createReadStream("index.html");
  res.writeHead(200, {
    "content-type": "text/html",
  });
  stream.pipe(res);
});
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    ws.send("server sent" + data);
  });

  
});

server.listen(8080);

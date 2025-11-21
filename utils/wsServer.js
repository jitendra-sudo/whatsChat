import { WebSocketServer } from "ws";

let clients = [];

export function setupWebSocketServer(server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("Client Connected");
    clients.push(ws);
    ws.on("close", () => {
      console.log("Client Disconnected");
      clients = clients.filter((c) => c !== ws);
    });
  });
  console.log("WebSocket Server Running");
}

export function broadcast(data) {
  clients.forEach((ws) => {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(data));
    }
  });
}

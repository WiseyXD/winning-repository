const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for connection
wss.on("connection", (ws) => {
    console.log("Client connected");

    // Event listener for messages from clients
    ws.on("message", (message) => {
        console.log(`Received message from client: ${message}`);

        // Echo the message back to the client
        ws.send(`Echo: ${message}`);
    });

    // Event listener for disconnection
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server listening on port 8080");

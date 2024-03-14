const socket = new WebSocket("ws://127.0.0.1:8000");

socket.addEventListener("open", () => {
    console.log("Connected to WebSocket server");
});

socket.addEventListener("message", (event) => {
    console.log("Message from server:", event.data);
});

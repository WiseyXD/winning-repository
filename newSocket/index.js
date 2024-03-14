// Connect to WebSocket server
const socket = new WebSocket("ws://localhost:8080"); // Replace with your server address

// Event listener for connection
socket.addEventListener("open", () => {
    console.log("Connected to WebSocket server");
});

// Event listener for receiving messages from the server
socket.addEventListener("message", (event) => {
    console.log("Message from server:", event.data);
});

// Event listener for disconnection
socket.addEventListener("close", () => {
    console.log("Disconnected from WebSocket server");
});

// Function to send a message to the server
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    console.log(message);

    // Send the message to the server
    socket.send(message);

    // Clear the input field
    messageInput.value = "";
}

import React, { useState, useEffect } from "react";

const WebSocketClient: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>("");
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080"); // WebSocket server address

        // Event listener for connection open
        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            setSocket(ws);
        };

        // Event listener for receiving messages
        ws.onmessage = (event: MessageEvent) => {
            const newMessage: string = event.data;
            setReceivedMessages((prevMessages) => [
                ...prevMessages,
                newMessage,
            ]);
        };

        // Event listener for connection close
        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
            setSocket(null);
        };

        // Cleanup function
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    // Function to handle sending messages
    const sendMessage = () => {
        if (
            socket &&
            socket.readyState === WebSocket.OPEN &&
            message.trim() !== ""
        ) {
            socket.send(message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Received Messages:</h2>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketClient;

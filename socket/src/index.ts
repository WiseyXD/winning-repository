import { Server } from "socket.io";

const io = new Server(3000, {
    // @ts-ignore
    cors: true,
});

io.on("connection", (socket) => {
    console.log("Socket Connected", socket.id);
    socket.on("frame", (data) => {
        console.log(data);
    });
});

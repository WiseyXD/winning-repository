import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket, setSocket } from "../features/socket/socketSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// TESTS

export default function Tests() {
    const socket = useSelector(selectSocket);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    console.log(socket);

    const handleSubmit = useCallback(() => {
        socket?.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleRoomJoin = useCallback(
        (data: any) => {
            const { email, room } = data;
            navigate(`/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket?.on("room:join", handleRoomJoin);
        return () => {
            socket?.off("room:join");
        };
    }, [socket]);

    return (
        <div>
            <h1>Home</h1>
            <br />
            <input
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="text"
                id="room"
                placeholder="roomId"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <Button>Submit</Button>
        </div>
    );
}

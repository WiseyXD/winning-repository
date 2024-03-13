import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSocket } from "../features/socket/socketSlice";

export default function TestPage() {
    const { roomId } = useParams();
    const socket = useSelector(selectSocket);

    const handleUserJoin = useCallback(({ email, id }: any) => {
        console.log(email);
    }, []);

    useEffect(() => {
        socket?.on("user:joined", (data) => {
            console.log(data);
        });

        return () => {
            socket?.off("user:joined", handleUserJoin);
        };
    }, [socket, handleUserJoin]);
    return <div>TestPage for {roomId}</div>;
}

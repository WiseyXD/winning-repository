import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { io, Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | null;
}

const initialState: SocketState = {
    socket: io("localhost:3000"),
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket | null>) => {
            // @ts-ignore
            state.socket = action.payload;
        },
    },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: { socket: SocketState }) =>
    state.socket.socket;

export default socketSlice.reducer;

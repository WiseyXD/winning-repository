import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WebSocket } from "ws";

interface SocketState {
    socket: WebSocket | null;
}

const initialState: SocketState = {
    socket: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<WebSocket | null>) => {
            state.socket = action.payload;
        },
    },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: { socket: SocketState }) =>
    state.socket.socket;

export default socketSlice.reducer;

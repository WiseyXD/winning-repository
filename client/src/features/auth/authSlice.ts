import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PayloadType {
    token: string;
    email: string;
    admin: boolean;
}

export interface AuthState {
    email: null | string;
    token: null | string;
    admin: null | boolean;
}

const initialState: AuthState = {
    token: null,
    email: null,
    admin: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<PayloadType>) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.admin = action.payload.admin;
        },
        unsetAuth: (state) => {
            state.token = null;
            state.email = null;
            state.admin = null;
        },
    },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;

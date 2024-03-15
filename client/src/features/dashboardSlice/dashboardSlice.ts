import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react";

export interface ComponentState {
    component: JSX.Element | null;
}

const initialState: ComponentState = {
    component: null,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardComponenet: (
            state,
            action: PayloadAction<ComponentState>
        ) => {
            state.component = action.payload.component;
        },
    },
});

export const { setDashboardComponenet } = dashboardSlice.actions;

export default dashboardSlice.reducer;

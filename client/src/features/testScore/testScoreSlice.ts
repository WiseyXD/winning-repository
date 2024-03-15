import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TTest } from "@wiseyxd/winning-project-common";

export interface ScoreState {
    score: number;
    wrongQuestions: string[] | [];
}
const initialState: ScoreState = {
    score: 0,
    wrongQuestions: [],
};

export const testScoreSlice = createSlice({
    name: "testScore",
    initialState,
    reducers: {
        setTestScore: (state) => {
            state.score += 1;
        },
        addWrongQuestion: (state, action: PayloadAction<string>) => {
            const newQuestion = action.payload;
            // @ts-ignore
            if (!state.wrongQuestions.includes(newQuestion)) {
                // @ts-ignore

                state.wrongQuestions.push(newQuestion);
            }
        },
        removeWrongQuestion: (state, action: PayloadAction<string>) => {
            state.wrongQuestions = state.wrongQuestions.filter(
                (question) => question !== action.payload
            );
        },
        resetScore: (state) => {
            state.score = 0;
        },
        resetWrongQuestions: (state) => {
            state.wrongQuestions = [];
        },
    },
});

export const {
    setTestScore,
    addWrongQuestion,
    removeWrongQuestion,
    resetScore,
    resetWrongQuestions,
} = testScoreSlice.actions;

export default testScoreSlice.reducer;

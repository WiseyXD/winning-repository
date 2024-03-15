import React, { useEffect } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGemini from "@/hooks/useGemini";

export default function TestSubmitted() {
    const wrongQuestions = useSelector(
        (state: RootState) => state.testScore.wrongQuestions
    );
    const { testId } = useParams();
    const ans = useGemini(wrongQuestions);
    const finalScore = useSelector((state: RootState) => state.testScore.score);

    // No need for local state for 'ans' if it's already handled by useGemini hook

    return (
        <div>
            <h2>Test Submitted</h2>
            <p>Final Score: {finalScore}</p>
            {/* Display wrong questions here if needed */}
            <p>{ans}</p>
        </div>
    );
}

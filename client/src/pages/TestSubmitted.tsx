import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function TestSubmitted() {
    const { testId } = useParams();
    const wrongQuestions = useSelector(
        (state: RootState) => state.testScore.wrongQuestions
    );
    const finalScore = useSelector((state: RootState) => state.testScore.score);

    return (
        <div>
            TestSubmitted
            {finalScore}
            {wrongQuestions.map((wr) => (
                <p>{wr}</p>
            ))}
        </div>
    );
}

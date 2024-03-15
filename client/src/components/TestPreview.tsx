import React from "react";

type TestPreviewProps = {
    test: any;
    finalScore: number;
    wrongQuestions: string[];
};

export default function TestPreview({
    test,
    finalScore,
    wrongQuestions,
}: TestPreviewProps) {
    console.log(wrongQuestions);
    console.log(test);
    const { title, description, duration } = test;
    return (
        <div className="flex flex-col">
            {wrongQuestions.map((wrongQuestion) => {
                return <>{wrongQuestion}</>;
            })}
        </div>
    );
}

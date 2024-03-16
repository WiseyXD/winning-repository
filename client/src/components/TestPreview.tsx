import React from "react";
import { Separator } from "./ui/separator";

type TestPreviewProps = {
    test: any;
    finalScore: number;
    wrongQuestions: string[];
};

// Winning Day

export default function TestPreview({
    test,
    finalScore,
    wrongQuestions,
}: TestPreviewProps) {
    console.log(wrongQuestions);
    // console.log(test);
    const { title, description, duration, questions } = test;
    console.log(questions);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <div className="">
                    <p className="text-2xl">{title} Test</p>
                </div>
                <div>
                    <p className="text-neutral-300">
                        Description :{description}
                    </p>
                </div>
                <div>
                    <p className="text-neutral-300">Duration: {duration}</p>
                </div>
            </div>

            <Separator />
            <div className="text-lg mb-3">Questions in the Test</div>
            <div className="flex flex-col gap-3">
                {questions.map((question: any, i: number) => {
                    return (
                        <div key={question.id} className="flex flex-col">
                            <h2
                                className={
                                    wrongQuestions.includes(question.text)
                                        ? "text-red-300"
                                        : ""
                                }
                            >
                                Q{i + 1}) {question.text}
                            </h2>
                            <ul className="grid grid-cols-1 lg:grid-cols-2">
                                {question.options.map((option: any) => {
                                    return (
                                        <>
                                            <li
                                                className={
                                                    option.right
                                                        ? "text-green-300"
                                                        : ""
                                                }
                                            >
                                                {option.text}
                                            </li>
                                        </>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

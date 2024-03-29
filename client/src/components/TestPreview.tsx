import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import useGemini from "@/hooks/useGemini";
import { Button } from "./ui/button";
import { askGemini } from "@/hooks/askGemini";

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
    const [ans, setAns] = useState("");
    // console.log(wrongQuestions);
    // console.log(test);
    const { title, description, duration, questions } = test;
    console.log(questions);

    async function askingGemini(question: string) {
        console.log("Asking Gemini");
        const resp = await askGemini(question);
        // @ts-ignore
        setAns(resp);
    }

    useEffect(() => {
        // This effect will run whenever 'ans' changes
        console.log("Answer received:", ans);
    }, [ans]);

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

                <div>
                    <p className="text-neutral-300">Your Score: {finalScore}</p>
                </div>
            </div>

            <Separator />
            <div className="text-lg mb-3">Questions in the Test</div>
            <div className="flex flex-col gap-5">
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

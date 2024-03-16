import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useGetTestOverviewQuery } from "@/app/api/student/testApi";
import ShimmerCards from "@/components/ShimmerCards";
import MinutesToMinutesAndSeconds from "@/components/MinutesToMinutesAndSeconds";
import {
    addWrongQuestion,
    removeWrongQuestion,
    resetScore,
    resetWrongQuestions,
    setTestScore,
} from "@/features/testScore/testScoreSlice";
import useMouseTracker from "@/hooks/useMouseTracker";
import useKeyboardTracker from "@/hooks/useKeyboardTracker";
import useTabTracker from "@/hooks/useTabTracker";

const WebSocketClient: React.FC = () => {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const userEmail = useSelector((state: RootState) => state.root.auth.email);
    const reduxScore = useSelector((state: RootState) => state.testScore.score);

    const wrong = useSelector(
        (state: RootState) => state.testScore.wrongQuestions
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { testId } = useParams();
    const { toast } = useToast();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const [questionNo, setQuestionNo] = useState<number>(0);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [socket2, setSocket2] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<string>("1");
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const [testIsGoing, setTestIsGoing] = useState(false);
    const [timer, setTimer] = useState(1 * 60);
    const [resrictedCount, setResrictedCount] = useState(0);
    const [sendIntervalId, setSendIntervalId] = useState<NodeJS.Timeout | null>(
        null
    );

    const isMouseNear = useMouseTracker(undefined, testIsGoing);
    const isWrongKeyPressed = useKeyboardTracker();
    useTabTracker();

    const elementRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        const ws2 = new WebSocket("ws://localhost:8082");

        // WebSocket server address

        // Event listener for connection open
        ws.onopen = () => {
            console.log("Connected to WebSocket server 1");
            setSocket(ws);
        };

        ws2.onopen = () => {
            console.log("Connected to WebSocket server 2");

            setSocket(ws2);
        };

        // Event listener for receiving messages
        ws.onmessage = (event: MessageEvent) => {
            const newMessage: string = event.data;
            setReceivedMessages((prevMessages) => [
                ...prevMessages,
                newMessage,
            ]);
            console.log(receivedMessages + "video");
        };

        ws2.onmessage = (event: MessageEvent) => {
            const newMessage: string = event.data;
            setReceivedMessages((prevMessages) => [
                ...prevMessages,
                newMessage,
            ]);
            console.log(receivedMessages + "audio");
        };

        // Event listener for connection close
        ws.onclose = () => {
            console.log("Disconnected from WebSocket server 1");
            setSocket(null);
        };

        ws2.onclose = () => {
            console.log("Disconnected from WebSocket server 2");
            setSocket2(null);
        };

        // Cleanup function
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
            if (ws2.readyState === WebSocket.OPEN) {
                ws2.close();
            }
        };
    }, []);

    // Fetch Test Details
    const { data, isFetching } = useGetTestOverviewQuery(testId);
    if (isFetching) return <ShimmerCards />;
    const test = data?.test;

    function sendEmail() {
        const templateParams = {
            from_name: "proctor.ai",
            from_email: "aryan.s.nag@gmail.com",
            to_name: "Sahil",
            message: `Test abducted for user :${userEmail} 
                Reported at : ${formattedDate}
                `,
        };
        emailjs
            .send(
                import.meta.env.VITE_BASE_MAIL_SERVICE,
                import.meta.env.VITE_BASE_MAIL_TEMPLATE,
                templateParams,
                import.meta.env.VITE_BASE_MAIL_PUBLIC
            )
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function checkOption(option: boolean) {
        if (option) {
            dispatch(setTestScore());
            dispatch(removeWrongQuestion(test.questions[questionNo].text));
        } else {
            {
                dispatch(addWrongQuestion(test.questions[questionNo].text));
            }
        }
    }

    function handleFullscreenKeyBlock(event: KeyboardEvent) {
        if (
            event.key === "Enter" ||
            event.key === "Control" ||
            event.key === "Alt" ||
            event.key === "F11" ||
            event.key === "Tab" ||
            event.key === "Meta"
        ) {
            event.preventDefault();
            console.log("Terminate");
            toast({
                title: `Terminate ${event.key}`,
                variant: "destructive",
            });
            handleSubmitTest();
            // Prevent default action for specified keys
        } else if (
            event.key === "c" ||
            event.key === "v" ||
            event.key === "Tab"
        ) {
            event.preventDefault();
            toast({
                title: `Alert ${event.key} ${resrictedCount}`,
                variant: "destructive",
            });
            console.log("Alert" + resrictedCount);
            if (resrictedCount > 3) handleSubmitTest();
            setResrictedCount((prev) => prev + 1);
        } else if (event.key === "Escape" && document.fullscreenElement) {
            event.preventDefault();
            console.log("Esc prevented");
        }
    }

    function checkEscacpe(e: KeyboardEvent) {
        if (e.key === "Escape") {
            e.preventDefault();
            console.log("Escape");
        }
    }

    const sendMessage = () => {
        if (
            socket &&
            socket.readyState === WebSocket.OPEN &&
            message.trim() !== ""
        ) {
            const time = setInterval(() => {
                socket.send(message);
            }, 10);
            setSendIntervalId(time);
        }
    };

    async function handleStartTest(e: any) {
        setTestIsGoing(true);
        // handleFullScreen();
        handleFullscreenKeyBlock(e);
        sendMessage();
        dispatch(resetScore());
        dispatch(resetWrongQuestions());
        sendEmail();
    }

    async function handleSubmitTest() {
        setTestIsGoing(false);
        navigate(`/${testId}/submit`);
        if (sendIntervalId) clearInterval(sendIntervalId);
    }

    return (
        <div ref={elementRef}>
            <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {testIsGoing ? (
                    <div className="max-w-[90%] w-full h-[80vh] mx-auto mt-4 flex justify-center items-center">
                        <Card className="w-3/5">
                            <CardHeader className="">
                                <div className="flex justify-between">
                                    <CardTitle>
                                        Q{questionNo + 1}){" "}
                                        {test.questions[questionNo].text}{" "}
                                        {reduxScore}
                                    </CardTitle>

                                    <p>
                                        Time left :
                                        <MinutesToMinutesAndSeconds
                                            minutes={test.duration}
                                        />
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {test.questions[questionNo].options.map(
                                        (option: any) => {
                                            return (
                                                <label
                                                    key={option.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="quizOption"
                                                        value={option.right}
                                                        onChange={(e) =>
                                                            checkOption(
                                                                option.right
                                                            )
                                                        }
                                                    />
                                                    <span className="text-white ml-2">
                                                        {option.text}
                                                    </span>
                                                </label>
                                            );
                                        }
                                    )}
                                </div>
                            </CardContent>
                            <div className="py-4 flex justify-between">
                                <Pagination className="">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={
                                                    questionNo === 0
                                                        ? "pointer-events-none opacity-50"
                                                        : undefined
                                                }
                                                onClick={() =>
                                                    setQuestionNo(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                            />
                                        </PaginationItem>
                                        {questionNo ===
                                        test.questions.length - 1 ? (
                                            <Button onClick={handleSubmitTest}>
                                                Submit
                                            </Button>
                                        ) : (
                                            <PaginationItem>
                                                <PaginationNext
                                                    className={
                                                        questionNo ===
                                                        test.questions.length -
                                                            1
                                                            ? "pointer-events-none opacity-50"
                                                            : undefined
                                                    }
                                                    onClick={() =>
                                                        setQuestionNo(
                                                            (prev) => prev + 1
                                                        )
                                                    }
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <Button onClick={(e) => handleStartTest(e)}>
                        Start Test
                    </Button>
                )}
            </div>
            <div>
                {wrong.map((wr) => {
                    return <h1 key={wr}>{wr}</h1>;
                })}
            </div>
        </div>
    );
};

export default WebSocketClient;

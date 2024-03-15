import React, { useState, useEffect, useRef } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const WebSocketClient: React.FC = () => {
  const isAuthorized = useSelector((state: RootState) => state.root.auth.token);
  const { testId } = useParams();
  const { toast } = useToast();

  const [questionNo, setQuestionNo] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("1");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [testIsGoing, setTestIsGoing] = useState(false);
  const [time, setTime] = useState(null);

  const elementRef = useRef(null);

  const handleFullScreen = () => {
    if (elementRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        // @ts-ignore
        elementRef.current.requestFullscreen().catch((err) => {
          console.error("Failed to enter fullscreen mode:", err);
        });
      }
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:7000/"); // WebSocket server address

    // Event listener for connection open
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
    };

    // Event listener for receiving messages
    ws.onmessage = (event: MessageEvent) => {
      const newMessage: string = event.data;
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(receivedMessages);
    };

    // Event listener for connection close
    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setSocket(null);
    };

    handleFullScreen();

    // Cleanup function
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Fetch Test Details
  const { data, isFetching } = useGetTestOverviewQuery(testId);
  if (isFetching) return <ShimmerCards />;
  const test = data?.test;
  console.log(test);

  const sendMessage = () => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      message.trim() !== ""
    ) {
      const time = setInterval(() => {
        socket.send(message);
      }, 10);
    }
  };

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
                    Q{questionNo + 1}) {test.questions[questionNo].text}{" "}
                  </CardTitle>

                  <p>
                    Time left :
                    <MinutesToMinutesAndSeconds minutes={120} />
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {test.questions[questionNo].options.map((option: any) => {
                    return (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="radio"
                          name="quizOption"
                          value={option.right}
                          // Assuming you have a function to handle option changes
                        />
                        <span className="text-white ml-2">{option.text}</span>
                      </label>
                    );
                  })}
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
                        onClick={() => setQuestionNo((prev) => prev - 1)}
                      />
                    </PaginationItem>
                    {questionNo === test.questions.length - 1 ? (
                      <Button onClick={() => setTestIsGoing(false)}>
                        Submit
                      </Button>
                    ) : (
                      <PaginationItem>
                        <PaginationNext
                          className={
                            questionNo === test.questions.length - 1
                              ? "pointer-events-none opacity-50"
                              : undefined
                          }
                          onClick={() => setQuestionNo((prev) => prev + 1)}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </Card>
          </div>
        ) : (
          <Button
            onClick={() => {
              setTestIsGoing(true);
            }}
          >
            Start Test
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebSocketClient;

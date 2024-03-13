import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

import { selectSocket } from "../features/socket/socketSlice";

const VideoStream = () => {
    const socket = useSelector(selectSocket);
    const webcamRef = useRef(null);

    const captureFrameInterval = useRef(null); // Ref to store the setInterval ID

    const captureFrameAndSend = () => {
        // Get the base64 encoded frame data from the webcam
        // @ts-ignore
        const frame = webcamRef.current.getScreenshot();
        const imageData = frame.split(",")[1]; // Extract base64 encoded image data
        const pixels = atob(imageData); // Decode base64 string to binary data
        const byteArray = new Uint8Array(pixels.length); // Create Uint8Array from binary data

        // Populate byteArray with pixel values
        for (let i = 0; i < pixels.length; i++) {
            byteArray[i] = pixels.charCodeAt(i);
        }

        // Send frame data to the server
        socket?.emit("frame", byteArray.buffer);
    };

    // Start capturing frames on component mount
    useEffect(() => {
        // @ts-ignore
        captureFrameInterval.current = setInterval(captureFrameAndSend, 500);

        // Clean up interval on component unmount
        return () => {
            // @ts-ignore
            clearInterval(captureFrameInterval.current);
            socket?.off();
        };
    }, []);

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} />
            {/* @ts-ignore */}
            <button onClick={() => clearInterval(captureFrameInterval.current)}>
                Stop
            </button>
        </div>
    );
};
export default VideoStream;

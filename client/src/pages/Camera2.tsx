import { useRef } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

import { selectSocket } from "../features/socket/socketSlice";

const VideoStream = () => {
    const webcamRef = useRef(null);
    const socket = useSelector(selectSocket);

    const captureFrameAndSend = () => {
        const frame = webcamRef.current.getScreenshot();
        const imageData = frame.split(",")[1]; // Extract base64 encoded image data
        const pixels = atob(imageData); // Decode base64 string to binary data
        const byteArray = new Uint8Array(pixels.length); // Create Uint8Array from binary data

        // Populate byteArray with pixel values
        for (let i = 0; i < pixels.length; i++) {
            byteArray[i] = pixels.charCodeAt(i);
        }

        // Send frame data to the server
        console.log(byteArray.buffer);
        socket?.emit("frame", byteArray.buffer);
    };

    const intervalId = setInterval(captureFrameAndSend, 500);

    return (
        <div>
            <Webcam audio={false} ref={webcamRef} />
            <button onClick={() => intervalId}>Click</button>
            <button onClick={() => clearInterval(intervalId)}>Stop</button>
        </div>
    );
};

export default VideoStream;

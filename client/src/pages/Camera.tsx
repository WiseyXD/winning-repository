import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server address

export function Camera() {
    const [videoRef, setVideoRef] = useState(null);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                setVideoRef(stream);
            })
            .catch((error) => {
                console.error("Error accessing camera:", error);
            });

        socket.on("connect", () => {
            console.log("Connected to socket server");
        });
    }, []);

    const captureFrame = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const video = videoRef;

        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);

            const frameData = canvas.toDataURL("image/jpeg", 0.5); // Adjust compression quality

            setImageData(frameData);
            console.log(frameData);
            socket.emit("frame", frameData); // Emit frame data to server
        }
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={setVideoRef}
                screenshotFunction={captureFrame}
            />
            {imageData && <img src={imageData} alt="captured frame" />}
            <button onClick={captureFrame}>Capture Frame</button>
        </div>
    );
}

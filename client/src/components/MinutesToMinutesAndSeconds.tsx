import React, { useState, useEffect } from "react";
import moment from "moment";

type TMinutesToMinutesAndSecondsProps = {
    minutes: number;
};

function MinutesToMinutesAndSeconds({
    minutes,
}: TMinutesToMinutesAndSecondsProps) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60); // Convert minutes to seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
        }, 1000); // Run every second

        return () => clearInterval(timer); // Clean up the timer
    }, []); // Run once on component mount

    const duration = moment.duration(timeLeft, "seconds");
    const formattedTime = moment
        .utc(duration.asMilliseconds())
        .format("H[h] m[m] s[s]");

    return <div>{formattedTime}</div>;
}

export default MinutesToMinutesAndSeconds;

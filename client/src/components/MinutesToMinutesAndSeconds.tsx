import React from "react";
import moment from "moment";

type TMinutesToMinutesAndSecondsProps = {
    minutes: number; // Rename the prop to minutes
};

function MinutesToMinutesAndSeconds({
    minutes, // Change the prop name
}: TMinutesToMinutesAndSecondsProps) {
    const duration = moment.duration(minutes, "minutes");
    const formattedTime = moment
        .utc(duration.asMilliseconds())
        .format("H[h] m[m] s[s]");

    return <div>{formattedTime}</div>;
}

export default MinutesToMinutesAndSeconds;

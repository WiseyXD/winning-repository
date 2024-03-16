import React, { useEffect } from "react";

const useTabTracker = () => {
    useEffect(() => {
        const handleTabSwitch = (event: BeforeUnloadEvent) => {
            // Cancel the event to prevent the tab switch
            event.preventDefault();
            // Prompt the user with a confirmation dialog
            event.returnValue = "Are you sure you want to leave this page?";
        };

        window.addEventListener("beforeunload", handleTabSwitch);

        return () => {
            window.removeEventListener("beforeunload", handleTabSwitch);
        };
    }, []);
};
export default useTabTracker;

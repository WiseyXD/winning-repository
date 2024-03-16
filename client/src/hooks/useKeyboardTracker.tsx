import React, { useEffect } from "react";

export default function useKeyboardTracker() {
    useEffect(() => {
        const handleKeyboardEvent = (event: KeyboardEvent) => {
            if (
                event.key === "Enter" ||
                event.key === "Escape" ||
                event.key === "Control" ||
                event.key === "Alt" ||
                event.key === "F11" ||
                event.key === "Tab" ||
                event.key === "Meta"
            ) {
                event.preventDefault();
                console.log("Terminate");
                // toast({
                //     title: `Terminate ${event.key}`,
                //     variant: "destructive",
                // });
                // handleSubmitTest();
                // Prevent default action for specified keys
            } else if (
                event.key === "c" ||
                event.key === "v" ||
                event.key === "Tab"
            ) {
                event.preventDefault();
                // toast({
                //     title: `Alert ${event.key} ${resrictedCount}`,
                //     variant: "destructive",
                // });
                console.log("Alert");
                // if (resrictedCount > 3) handleSubmitTest();
                // setResrictedCount((prev) => prev + 1);
            }
        };

        window.addEventListener("keydown", handleKeyboardEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyboardEvent);
        };
    }, []);
}

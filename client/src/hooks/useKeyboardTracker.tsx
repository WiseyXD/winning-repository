import React, { useEffect } from "react";
// @ts-ignore
export default function useKeyboardTracker(setResrictedCount) {
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
                setResrictedCount(10);
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
                setResrictedCount((prev) => prev + 1);

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

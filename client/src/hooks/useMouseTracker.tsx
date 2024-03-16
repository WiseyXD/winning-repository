import { useEffect } from "react";

const useMouseTracker = (threshold = 50, testIsGoing: boolean) => {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { screenY } = event; // Get the Y coordinate of the mouse relative to the screen
            const screenHeight = window.screen.height;
            console.log("Tracking");
            // If the mouse reaches the taskbar (within the defined threshold), trigger an alert
            if (screenY >= screenHeight - threshold) {
                console.log("Mouse reached taskbar!");
                alert("Mouse reached taskbar!");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [threshold]);
};

export default useMouseTracker;

import { useEffect } from "react";

const useMouseTracker = (
    threshold = 50,
    testIsGoing: boolean,
    // @ts-ignore
    setResrictedCount
) => {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { screenY } = event; // Get the Y coordinate of the mouse relative to the screen
            const screenHeight = window.screen.height;

            // If the mouse reaches the taskbar (within the defined threshold), trigger an alert
            if (screenY <= 130) {
                console.log("Mouse reached upper!");
                //@ts-ignore
                setResrictedCount((prev) => prev + 1);
            } else if (screenY >= screenHeight - threshold) {
                console.log("Mouse reached taskbar!");
                //@ts-ignore
                setResrictedCount((prev) => prev + 1);
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

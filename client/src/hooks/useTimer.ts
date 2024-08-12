import { useEffect, useState } from "react";

export default function useTimer(initialStatus: boolean = true, duration: number = 5000) {
    const [toggleContents, setToggleContents] = useState(initialStatus);

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggleContents((prev) => !prev);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);
    return { toggleContents, setToggleContents };
}

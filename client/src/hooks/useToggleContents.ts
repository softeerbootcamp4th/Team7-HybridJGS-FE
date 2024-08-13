import { useCallback, useEffect, useState } from "react";

export default function useToggleContents(initialStatus: boolean = true, duration?: number) {
    const [toggleContents, setToggleContents] = useState(initialStatus);

    const toggle = useCallback(() => {
        setToggleContents((prev) => !prev);
    }, []);

    useEffect(() => {
        if (duration !== undefined && duration > 0) {
            const timer = setTimeout(() => {
                toggle();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, toggle]);

    return { toggleContents, toggle };
}

import { useCallback, useEffect, useState } from "react";

interface UseToggleContentsProps {
    initialStatus?: boolean;
    duration?: number;
    useDuration?: boolean;
}

export default function useToggleContents({
    initialStatus = true,
    duration = 5000,
    useDuration = true,
}: UseToggleContentsProps = {}) {
    const [toggleContents, setToggleContents] = useState(initialStatus);

    const toggle = useCallback(() => {
        setToggleContents((prev) => !prev);
    }, []);

    useEffect(() => {
        if (useDuration) {
            const timer = setTimeout(() => {
                toggle();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [useDuration, duration, toggle]);

    return { toggleContents, toggle };
}

import { useEffect, useState } from "react";
import { unstable_usePrompt, useLocation } from "react-router-dom";

export function useBlockNavigation(message: string) {
    const location = useLocation();
    const [isBlocking, setIsBlocking] = useState(false);

    unstable_usePrompt({ when: isBlocking, message });

    const unblockNavigation = () => {
        setIsBlocking(false);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isBlocking) {
            e.preventDefault();
            e.returnValue = "";
        }
    };

    useEffect(() => {
        setIsBlocking(true);

        return () => {
            setIsBlocking(false);
        };
    }, [location]);
    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isBlocking]);

    return { unblockNavigation };
}

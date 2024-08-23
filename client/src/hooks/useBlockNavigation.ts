import { useEffect, useState } from "react";
import { useBlocker, useLocation } from "react-router-dom";

export function useBlockNavigation() {
    const location = useLocation();
    const [isBlocking, setIsBlocking] = useState(false);

    const blocker = useBlocker(isBlocking);
    const isBlockedNavigation = blocker.state === "blocked";

    const unblockNavigation = () => {
        setIsBlocking(false);
    };

    const cancelNavigation = () => {
        if (blocker.state === "blocked") {
            blocker.reset();
        }
    };

    const proceedNavigation = () => {
        if (blocker.state === "blocked") {
            blocker.proceed();
        }
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

    return { unblockNavigation, isBlockedNavigation, proceedNavigation, cancelNavigation };
}

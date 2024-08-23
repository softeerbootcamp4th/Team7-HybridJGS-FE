import { useEffect, useState } from "react";

export default function useCountdown(initialTime: number | null) {
    const [time, setTime] = useState<number | null>(initialTime);

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (time === null || time < 0) return;

        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime !== null && prevTime >= 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return time;
}

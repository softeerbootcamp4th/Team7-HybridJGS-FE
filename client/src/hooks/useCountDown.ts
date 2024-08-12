import { useEffect, useState } from "react";

export default function useCountDown(initialTime: number) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (time < 0) return;

        const timer = setInterval(() => {
            if (time >= 0) setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return time;
}

import { useEffect, useState } from "react";

export default function useCountDown(initialTime: number) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time <= 0) return;

        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return time;
}

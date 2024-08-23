import { useRef } from "react";

export default function useScrollToTarget<T extends HTMLElement>() {
    const targetRef = useRef<T>(null);

    const handleScrollToTarget = () => {
        targetRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return { targetRef, handleScrollToTarget };
}

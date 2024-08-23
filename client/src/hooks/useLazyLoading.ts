import { useEffect, useRef, useState } from "react";

export default function useLazyLoading<T extends HTMLElement>() {
    const [isInView, setIsInView] = useState<boolean>(false);
    const targetRef = useRef<T>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0, root: document.body }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [targetRef]);

    return { isInView, targetRef };
}

import { useEffect, useRef, useState } from "react";

export default function useLazyLoading<T extends HTMLElement>() {
    const [isInView, setIsInView] = useState<boolean>(false);
    const cardRef = useRef<T>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(entry.isIntersecting);
                    observer.disconnect();
                }
            },
            { threshold: 0, root: document.body }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [cardRef]);

    return { isInView, cardRef };
}

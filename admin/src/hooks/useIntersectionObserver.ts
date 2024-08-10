import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions<T> {
    onIntersect: () => void;
    enabled: boolean;
    root?: Element | null;
    rootMargin?: string;
}

function useIntersectionObserver<T extends HTMLElement>({
    onIntersect,
    enabled,
    root = document.body,
    rootMargin = "0px",
}: UseIntersectionObserverOptions<T>) {
    const targetRef = useRef<T>(null);

    useEffect(() => {
        if (!enabled || !targetRef.current) {
            return;
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const isIntersect = entries.some((entry) => entry.isIntersecting);
            if (isIntersect) {
                onIntersect();
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            root,
            rootMargin,
        });
        observer.observe(targetRef.current);

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [targetRef, root, onIntersect, enabled]);

    return { targetRef };
}

export default useIntersectionObserver;

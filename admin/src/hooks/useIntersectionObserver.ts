import { RefObject, useEffect, useRef } from "react";

// @ts-expect-error: props로 Generic을 받아서 target 타입 선언 필요
interface UseIntersectionObserverOptions<T extends HTMLElement> {
    onIntersect: () => void;
    enabled: boolean;
    root?: RefObject<Element | null>;
    rootMargin?: string;
}

function useIntersectionObserver<T extends HTMLElement>({
    onIntersect,
    enabled,
    root,
    rootMargin = "0px",
}: UseIntersectionObserverOptions<T>) {
    const targetRef = useRef<T>(null);

    useEffect(() => {
        if (!enabled || !targetRef.current || !root?.current) {
            return;
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const isIntersect = entries.some((entry) => entry.isIntersecting);
            if (isIntersect) {
                onIntersect();
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: root.current || document.body,
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

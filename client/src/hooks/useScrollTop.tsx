import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            window.scroll({ top: 0 });
        };

        handleScroll();
        window.addEventListener("beforeunload", handleScroll);

        return () => {
            window.removeEventListener("beforeunload", handleScroll);
        };
    }, [pathname]);
}

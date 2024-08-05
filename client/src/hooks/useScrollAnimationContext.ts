import { useContext } from "react";
import { ScrollAnimationContext } from "../contexts/scrollAnimationContext.tsx";

export default function useScrollAnimationContext() {
    const context = useContext(ScrollAnimationContext);
    if (context === null) {
        throw new Error("scrollAnimationContext must be used within a useScrollAnimationProvider");
    }
    return context;
}

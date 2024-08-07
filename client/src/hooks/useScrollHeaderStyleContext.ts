import { useContext } from "react";
import { ScrollHeaderStyleContext } from "../contexts/scrollHeaderStyleContext.tsx";

export default function useScrollHeaderStyleContext() {
    const context = useContext(ScrollHeaderStyleContext);
    if (context === null) {
        throw new Error(
            "scrollHeaderStyleContext must be used within a useScrollHeaderStyleProvider"
        );
    }
    return context;
}

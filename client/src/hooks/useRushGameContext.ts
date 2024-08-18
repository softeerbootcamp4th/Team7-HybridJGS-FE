import { useContext } from "react";
import { RushGameContext } from "@/contexts/rushGameContext.tsx";

export const useRushGameContext = () => {
    const context = useContext(RushGameContext);
    if (context === undefined) {
        throw new Error("useRushGameContext must be used within a RushGameProvider");
    }
    return context;
};

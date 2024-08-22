import { useContext } from "react";
import { RushGameStateContext } from "@/contexts/rushGameContext.tsx";
import { RushGameStateType } from "@/types/rushGame.ts";

export default function useRushGameStateContext(): RushGameStateType {
    const context = useContext(RushGameStateContext);
    if (context === undefined) {
        throw new Error("useRushGameStateContext must be used within a RushGameProvider");
    }
    return context;
}

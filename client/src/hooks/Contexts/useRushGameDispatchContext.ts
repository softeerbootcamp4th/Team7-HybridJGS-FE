import { useContext } from "react";
import { RushGameDispatchContext } from "@/contexts/rushGameContext.tsx";
import { RushGameDispatchType } from "@/types/rushGame.ts";

export default function useRushGameDispatchContext(): RushGameDispatchType {
    const context = useContext(RushGameDispatchContext);
    if (context === undefined) {
        throw new Error("useRushGameDispatchContext must be used within a RushGameProvider");
    }
    return context;
}

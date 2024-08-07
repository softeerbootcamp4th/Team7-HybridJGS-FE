import { useContext } from "react";
import { RushEventStateContext } from "@/contexts/rushEventContext";
import { RushEventStateType } from "@/types/rush";

export default function useRushEventStateContext(): RushEventStateType {
    const context = useContext(RushEventStateContext);
    if (context === null) {
        throw new Error("RushEventStateContext must be used within a useRushEventStateContext");
    }
    return context;
}

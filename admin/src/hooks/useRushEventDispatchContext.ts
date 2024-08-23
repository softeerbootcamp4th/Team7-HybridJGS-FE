import { useContext } from "react";
import { RushEventDispatchContext } from "@/contexts/rushEventContext";
import { RushEventDispatchType } from "@/types/rush";

export default function useRushEventDispatchContext(): RushEventDispatchType {
    const context = useContext(RushEventDispatchContext);
    if (context === null) {
        throw new Error(
            "RushEventDispatchContext must be used within a useRushEventDispatchContext"
        );
    }
    return context;
}

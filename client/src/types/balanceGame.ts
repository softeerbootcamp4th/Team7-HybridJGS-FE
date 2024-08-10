import React from "react";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";

export interface BalanceGameContextType {
    gameState: {
        phase: "PRE_EVENT" | "EVENT_RUNNING" | "EVENT_ENDED";
        userParticipated: boolean;
    };
    setGameState: React.Dispatch<React.SetStateAction<BalanceGameContextType["gameState"]>>;
    updateUserParticipationStatus: (response: GetRushUserParticipationStatusResponse) => void;
}

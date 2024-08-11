import React from "react";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";

export interface RushGameContextType {
    gameState: {
        phase: "PRE_EVENT" | "EVENT_RUNNING" | "EVENT_ENDED";
        userParticipated: boolean;
    };
    setGameState: React.Dispatch<React.SetStateAction<RushGameContextType["gameState"]>>;
    updateUserParticipationStatus: (response: GetRushUserParticipationStatusResponse) => void;
}

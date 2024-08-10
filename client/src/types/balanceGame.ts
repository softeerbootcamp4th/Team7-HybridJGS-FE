import React from "react";

export interface BalanceGameContextType {
    gameState: {
        phase: "PRE_EVENT" | "EVENT_RUNNING" | "EVENT_ENDED";
        userParticipationStatus: "NOT_PARTICIPATED" | "SELECTED" | "VIEWED_RESULT";
    };
    setGameState: React.Dispatch<React.SetStateAction<BalanceGameContextType["gameState"]>>;
}

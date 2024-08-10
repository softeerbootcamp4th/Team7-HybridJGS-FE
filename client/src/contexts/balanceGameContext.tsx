import React, { ReactNode, createContext, useState } from "react";
import { BalanceGameContextType } from "@/types/balanceGame";

export const BalanceGameContext = createContext<BalanceGameContextType | undefined>(undefined);

export const BalanceGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<BalanceGameContextType["gameState"]>({
        phase: "PRE_EVENT",
        userParticipationStatus: "NOT_PARTICIPATED",
    });

    return (
        <BalanceGameContext.Provider value={{ gameState, setGameState }}>
            {children}
        </BalanceGameContext.Provider>
    );
};

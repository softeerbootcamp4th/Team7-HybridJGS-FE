import { ReactNode, createContext, useState } from "react";
import { BalanceGameContextType } from "@/types/balanceGame";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";

export const BalanceGameContext = createContext<BalanceGameContextType | undefined>(undefined);

export const BalanceGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<BalanceGameContextType["gameState"]>({
        phase: "PRE_EVENT",
        userParticipated: false,
    });

    const updateUserParticipationStatus = (response: GetRushUserParticipationStatusResponse) => {
        setGameState((prevState) => ({
            ...prevState,
            userParticipated: response.result,
        }));
    };

    return (
        <BalanceGameContext.Provider
            value={{ gameState, setGameState, updateUserParticipationStatus }}
        >
            {children}
        </BalanceGameContext.Provider>
    );
};

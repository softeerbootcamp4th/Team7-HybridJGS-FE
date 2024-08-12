import { ReactNode, createContext, useState } from "react";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";
import { RushGameContextType } from "@/types/rushGame.ts";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
        phase: "PRE_EVENT",
        userParticipatedStatus: false,
    });

    const setUserParticipationStatus = (status: GetRushUserParticipationStatusResponse) => {
        setGameState((prevState) => ({
            ...prevState,
            userParticipatedStatus: status,
        }));
    };

    return (
        <RushGameContext.Provider value={{ gameState, setGameState, setUserParticipationStatus }}>
            {children}
        </RushGameContext.Provider>
    );
};

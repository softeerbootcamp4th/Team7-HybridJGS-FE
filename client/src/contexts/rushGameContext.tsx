import { ReactNode, createContext, useState } from "react";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";
import { RushGameContextType } from "@/types/rushGame.ts";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
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
        <RushGameContext.Provider
            value={{ gameState, setGameState, updateUserParticipationStatus }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

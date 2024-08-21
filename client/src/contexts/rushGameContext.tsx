import { ReactNode, createContext, useCallback, useState } from "react";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
        phase: CARD_PHASE.NOT_STARTED,
        userParticipatedStatus: false,
        userSelectedOption: CARD_OPTION.LEFT_OPTIONS,
        cardOptions: {
            [CARD_OPTION.LEFT_OPTIONS]: {
                mainText: "",
                subText: "",
                resultMainText: "",
                resultSubText: "",
                color: CARD_COLOR.GREEN,
                selectionCount: 0,
            },
            [CARD_OPTION.RIGHT_OPTIONS]: {
                mainText: "",
                subText: "",
                resultMainText: "",
                resultSubText: "",
                color: CARD_COLOR.BLUE,
                selectionCount: 0,
            },
        },
    });

    const setGamePhase = useCallback((phase: GamePhase) => {
        setGameState((prevState) => ({ ...prevState, phase }));
    }, []);

    const setUserParticipationStatus = useCallback((status: boolean) => {
        setGameState((prevState) => ({ ...prevState, userParticipatedStatus: status }));
    }, []);

    const setUserSelectedOption = useCallback((option: CardOption) => {
        setGameState((prevState) => ({ ...prevState, userSelectedOption: option }));
    }, []);

    const setCardOptions = useCallback((option: CardOption, updates: Partial<CardOptionState>) => {
        setGameState((prevState) => ({
            ...prevState,
            cardOptions: {
                ...prevState.cardOptions,
                [option]: { ...prevState.cardOptions[option], ...updates },
            },
        }));
    }, []);

    return (
        <RushGameContext.Provider
            value={{
                gameState,
                setCardOptions,
                setUserParticipationStatus,
                setGamePhase,
                setUserSelectedOption,
            }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

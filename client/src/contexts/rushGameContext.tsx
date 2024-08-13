import { ReactNode, createContext, useCallback, useState } from "react";
import { CARD_COLOR, CARD_TYPE } from "@/constants/Rush/rushCard";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
        phase: "NOT_STARTED",
        countdown: 0,
        userParticipatedStatus: false,
        userSelectedOption: null,
        cardOptions: {
            [CARD_TYPE.LEFT_OPTIONS]: {
                mainText: "",
                subText: "",
                color: CARD_COLOR.GREEN,
                selectionCount: 0,
            },
            [CARD_TYPE.RIGHT_OPTIONS]: {
                mainText: "",
                subText: "",
                color: CARD_COLOR.BLUE,
                selectionCount: 0,
            },
        },
    });

    const setGamePhase = useCallback((phase: GamePhase) => {
        setGameState((prevState) => ({ ...prevState, phase }));
    }, []);

    const setCountdown = useCallback((countdown: number) => {
        setGameState((prevState) => ({ ...prevState, countdown: countdown }));
    }, []);

    const setUserParticipationStatus = useCallback((status: boolean) => {
        setGameState((prevState) => ({ ...prevState, userParticipatedStatus: status }));
    }, []);

    const setUserSelectedOption = useCallback((option: CardOption | null) => {
        setGameState((prevState) => ({ ...prevState, userSelectedOption: option }));
    }, []);

    const updateCardOption = useCallback(
        (option: CardOption, updates: Partial<CardOptionState>) => {
            setGameState((prevState) => ({
                ...prevState,
                cardOptions: {
                    ...prevState.cardOptions,
                    [option]: { ...prevState.cardOptions[option], ...updates },
                },
            }));
        },
        []
    );

    return (
        <RushGameContext.Provider
            value={{
                gameState,
                setGamePhase,
                setCountdown,
                setUserParticipationStatus,
                setUserSelectedOption,
                updateCardOption,
            }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

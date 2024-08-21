import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";
import { getMsTime } from "@/utils/getMsTime.ts";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const rushData = useLoaderData() as GetTotalRushEventsResponse;

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

    // TODO: dispatch action으로 함수로 빼서 RushGame 컴포넌트에서 함수를 호출해서 초기화해주는 것이 맞다고 생각..
    useEffect(() => {
        if (rushData) {
            const serverDate = new Date(rushData.serverTime).toISOString().split("T")[0];

            const currentEvent = rushData.events.find((event) => {
                const eventDate = new Date(event.startDateTime).toISOString().split("T")[0];
                return eventDate === serverDate && event.rushEventId === rushData.todayEventId;
            });

            if (currentEvent) {
                const serverTime = getMsTime(rushData.serverTime);
                const startTime = getMsTime(currentEvent.startDateTime);
                const endTime = getMsTime(currentEvent.endDateTime);

                if (serverTime < startTime) {
                    setGamePhase(CARD_PHASE.NOT_STARTED);
                } else if (serverTime >= startTime && serverTime <= endTime) {
                    setGamePhase(CARD_PHASE.IN_PROGRESS);
                } else if (serverTime > endTime) {
                    setGamePhase(CARD_PHASE.COMPLETED);
                }
            }
        }
    }, [rushData, setGamePhase]);

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

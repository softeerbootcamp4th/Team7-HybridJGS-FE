import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CARD_COLOR, CARD_TYPE } from "@/constants/Rush/rushCard";
import useCountdown from "@/hooks/useCountdown.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const rushData = useLoaderData() as GetTotalRushEventsResponse;
    const [initialPreCountdown, setInitialPreCountdown] = useState<number | null>(null);
    const [initialRunCountdown, setInitialRunCountdown] = useState<number | null>(null);

    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
        phase: "NOT_STARTED",
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

    useEffect(() => {
        const currentEvent = rushData.events.find(
            (event) => event.rushEventId === rushData.todayEventId
        );
        if (currentEvent) {
            const serverTime = new Date(rushData.serverTime).getTime();
            const startTime = new Date(currentEvent.startDateTime).getTime();
            const endTime = new Date(currentEvent.endDateTime).getTime();

            switch (gameState.phase) {
                case "NOT_STARTED":
                    if (rushData.serverTime && currentEvent?.startDateTime) {
                        const preCountdown = Math.max(
                            0,
                            Math.floor((startTime - serverTime) / 1000)
                        );
                        setInitialPreCountdown(preCountdown);
                    }
                    break;
                case "IN_PROGRESS":
                    if (rushData.serverTime && currentEvent?.endDateTime) {
                        const runCountdown = Math.max(0, Math.floor((endTime - serverTime) / 1000));
                        setInitialRunCountdown(runCountdown);
                    }
                    break;
            }
        }
    }, [rushData, gameState.phase]);

    const preCountdown = useCountdown(initialPreCountdown || 0);
    const runCountdown = useCountdown(initialRunCountdown || 0);

    useEffect(() => {
        if (preCountdown <= 0 && gameState.phase === "NOT_STARTED") {
            setGamePhase("IN_PROGRESS");
        } else if (runCountdown <= 0 && gameState.phase === "IN_PROGRESS") {
            setGamePhase("COMPLETED");
        }
    }, [preCountdown, runCountdown]);

    // TODO: POST 후 사용자 참여 상태 업데이트 및 진행 상태 수정
    // const userParticipatedStatus = await RushAPI.getRushUserParticipationStatus(
    //     cookies[COOKIE_TOKEN_KEY]
    // );
    // setUserParticipationStatus(userParticipatedStatus);

    // useEffect(() => {
    //     if (gameState.userParticipatedStatus) {
    //         setGameState((prev) => ({
    //             ...prev,
    //             phase: "IN_PROGRESS",
    //         }));
    //     }
    // }, [gameState.userParticipatedStatus, setGameState]);

    return (
        <RushGameContext.Provider
            value={{
                gameState,
                preCountdown,
                runCountdown,
                setGamePhase,
                setUserParticipationStatus,
                setUserSelectedOption,
                updateCardOption,
            }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

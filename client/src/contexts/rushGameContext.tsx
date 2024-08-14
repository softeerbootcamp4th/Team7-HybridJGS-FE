import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLOR, CARD_TYPE } from "@/constants/Rush/rushCard";
import useCountdown from "@/hooks/useCountdown.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const rushData = useLoaderData() as GetTotalRushEventsResponse;
    const [initialPreCountdown, setInitialPreCountdown] = useState<number | null>(null);
    const [initialRunCountdown, setInitialRunCountdown] = useState<number | null>(null);

    const [gameState, setGameState] = useState<RushGameContextType["gameState"]>({
        phase: "NOT_STARTED",
        userParticipatedStatus: false,
        userSelectedOption: CARD_TYPE.LEFT_OPTIONS,
        cardOptions: {
            [CARD_TYPE.LEFT_OPTIONS]: {
                mainText: "",
                subText: "",
                resultMainText: "",
                resultSubText: "",
                color: CARD_COLOR.GREEN,
                selectionCount: 0,
            },
            [CARD_TYPE.RIGHT_OPTIONS]: {
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

    const updateCardOptions = useCallback(
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

    // const preCountdown = useCountdown(initialPreCountdown || 0);
    // const runCountdown = useCountdown(initialRunCountdown || 0);

    const preCountdown = useCountdown(1);
    const runCountdown = useCountdown(10);

    useEffect(() => {
        if (preCountdown <= 0 && gameState.phase === "NOT_STARTED") {
            setGamePhase("IN_PROGRESS");
        } else if (runCountdown <= 0 && gameState.phase === "IN_PROGRESS") {
            setGamePhase("COMPLETED");
        }
    }, [preCountdown, runCountdown]);

    // console.log(gameState.cardOptions);

    const updateUserStatusAndSelectedOption = useCallback(
        async (token: string, selectedOption: CardOption) => {
            try {
                const userParticipatedStatus = await RushAPI.getRushUserParticipationStatus(token);
                setUserParticipationStatus(userParticipatedStatus);
                if (userParticipatedStatus) {
                    setUserSelectedOption(selectedOption);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        },
        []
    );

    const getSelectedCardInfo = useCallback(
        (option: CardOption) => {
            const cardInfo = gameState.cardOptions[option];
            return {
                mainText: cardInfo.mainText,
                subText: cardInfo.subText,
                resultMainText: cardInfo.resultMainText,
                resultSubText: cardInfo.resultSubText,
                color: cardInfo.color,
                selectionCount: cardInfo.selectionCount,
            };
        },
        [gameState.userSelectedOption, gameState.cardOptions]
    );

    const fetchRushBalance = useCallback(async (): Promise<void> => {
        try {
            const rushBalanceData = await RushAPI.getRushBalance(cookies[COOKIE_TOKEN_KEY]);
            const { leftOption, rightOption } = rushBalanceData;

            updateCardOptions(CARD_TYPE.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            updateCardOptions(CARD_TYPE.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    }, [cookies]);

    const getOptionRatio = useCallback(
        (option: CardOption): number => {
            const total =
                gameState.cardOptions[CARD_TYPE.LEFT_OPTIONS].selectionCount +
                gameState.cardOptions[CARD_TYPE.RIGHT_OPTIONS].selectionCount;
            if (total === 0) return 0;
            const ratio = (gameState.cardOptions[option].selectionCount / total) * 100;
            return Math.round(ratio * 100) / 100;
        },
        [gameState.cardOptions]
    );

    return (
        <RushGameContext.Provider
            value={{
                gameState,
                preCountdown,
                runCountdown,
                setGamePhase,
                setUserParticipationStatus,
                setUserSelectedOption,
                updateCardOptions,
                updateUserStatusAndSelectedOption,
                getSelectedCardInfo,
                getOptionRatio,
                fetchRushBalance,
            }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

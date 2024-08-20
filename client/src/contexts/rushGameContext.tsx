import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useFetch from "@/hooks/useFetch.ts";
import {
    GetRushBalanceResponse,
    GetRushUserParticipationStatusResponse,
    GetTotalRushEventsResponse,
} from "@/types/rushApi.ts";
import { CardOption, CardOptionState, GamePhase, RushGameContextType } from "@/types/rushGame";
import { getMsTime } from "@/utils/getMsTime.ts";

export const RushGameContext = createContext<RushGameContextType | undefined>(undefined);

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
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

    const { data: userParticipatedStatus, fetchData: getRushUserParticipationStatus } = useFetch<
        GetRushUserParticipationStatusResponse,
        string
    >((token) => RushAPI.getRushUserParticipationStatus(token));

    // TODO: 상태 업데이트랑 옵션 업데이트 분리할까? 어차피 setUserSelectedOption이랑 setUserParticipationStatus 함수 다 내려줄건데 뭐하러 이렇게 하남..?
    // TODO: 그냥 updateUserStatusAndSelectedOption 이 함수 호출해주는 곳에서 RushAPI.getRushUserParticipationStatus 이거 호출해주고, setUserSelectedOption 함수만 받아서 쓰면 될 것 같은데
    const updateUserStatusAndSelectedOption = useCallback(
        async (token: string, selectedOption: CardOption) => {
            await getRushUserParticipationStatus(token);
            setUserSelectedOption(selectedOption);
        },
        []
    );

    useEffect(() => {
        if (userParticipatedStatus !== null) {
            setUserParticipationStatus(userParticipatedStatus);
        }
    }, [userParticipatedStatus]);

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

    const {
        data: rushBalanceData,
        isSuccess: isSuccessRushBalance,
        fetchData: getRushBalance,
    } = useFetch<GetRushBalanceResponse, string>((token) => RushAPI.getRushBalance(token));

    const fetchRushBalance = useCallback(async (): Promise<void> => {
        await getRushBalance(cookies[COOKIE_KEY.ACCESS_TOKEN]);
    }, [cookies, getRushBalance]);

    useEffect(() => {
        if (isSuccessRushBalance && rushBalanceData) {
            const { leftOption, rightOption } = rushBalanceData;

            updateCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            updateCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        }
    }, [isSuccessRushBalance, rushBalanceData]);

    const getOptionRatio = useCallback(
        (option: CardOption): number => {
            const total =
                gameState.cardOptions[CARD_OPTION.LEFT_OPTIONS].selectionCount +
                gameState.cardOptions[CARD_OPTION.RIGHT_OPTIONS].selectionCount;
            if (total === 0) return 0;
            const ratio = (gameState.cardOptions[option].selectionCount / total) * 100;
            return Math.round(ratio * 100) / 100;
        },
        [gameState.cardOptions]
    );

    useEffect(() => {
        if (rushData) {
            const currentEvent = rushData.events.find(
                (event) => event.rushEventId === rushData.todayEventId
            );

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
                updateCardOptions,
                updateUserStatusAndSelectedOption,
                getSelectedCardInfo,
                getOptionRatio,
                fetchRushBalance,
                setUserParticipationStatus,
                setGamePhase,
                setUserSelectedOption,
            }}
        >
            {children}
        </RushGameContext.Provider>
    );
};

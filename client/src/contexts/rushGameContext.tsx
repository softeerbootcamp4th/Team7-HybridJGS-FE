import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useCountdown from "@/hooks/useCountdown.ts";
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
    // const navigate  = useNavigate();
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const rushData = useLoaderData() as GetTotalRushEventsResponse;
    const [_initialPreCountdown, setInitialPreCountdown] = useState<number | null>(null);
    const [_initialRunCountdown, setInitialRunCountdown] = useState<number | null>(null);

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

    const {
        data: userParticipatedStatus,
        isSuccess: isSuccessUserParticipationStatus,
        fetchData: getRushUserParticipationStatus,
    } = useFetch<GetRushUserParticipationStatusResponse, string>((token) =>
        RushAPI.getRushUserParticipationStatus(token)
    );

    const updateUserStatusAndSelectedOption = useCallback(
        async (token: string, selectedOption: CardOption) => {
            await getRushUserParticipationStatus(token);
            setUserSelectedOption(selectedOption);
        },
        []
    );

    useEffect(() => {
        if (isSuccessUserParticipationStatus && userParticipatedStatus) {
            setUserParticipationStatus(userParticipatedStatus);
        }
    }, [isSuccessUserParticipationStatus, userParticipatedStatus]);

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
        const currentEvent = rushData.events.find(
            (event) => event.rushEventId === rushData.todayEventId
        );
        if (currentEvent) {
            const serverTime = getMsTime(rushData.serverTime);
            const startTime = getMsTime(currentEvent.startDateTime);
            const endTime = getMsTime(currentEvent.endDateTime);

            switch (gameState.phase) {
                case CARD_PHASE.NOT_STARTED:
                    if (rushData.serverTime && currentEvent?.startDateTime) {
                        const preCountdown = Math.max(
                            0,
                            Math.floor((startTime - serverTime) / 1000)
                        );
                        setInitialPreCountdown(preCountdown);
                    }
                    break;
                case CARD_PHASE.IN_PROGRESS:
                    if (rushData.serverTime && currentEvent?.endDateTime) {
                        const runCountdown = Math.max(0, Math.floor((endTime - serverTime) / 1000));
                        setInitialRunCountdown(runCountdown);
                    }
                    break;
            }
        }
    }, [rushData, gameState.phase]);

    // const preCountdown = useCountdown(initialPreCountdown || 1);
    // const runCountdown = useCountdown(initialRunCountdown || 1);

    // TEST COUNTDOWN CODE
    const preCountdown = useCountdown(3);
    const runCountdown = useCountdown(10);

    useEffect(() => {
        if (preCountdown <= 0 && gameState.phase === CARD_PHASE.NOT_STARTED) {
            setGamePhase(CARD_PHASE.IN_PROGRESS);
        } else if (runCountdown <= 0 && gameState.phase === CARD_PHASE.IN_PROGRESS) {
            setGamePhase(CARD_PHASE.COMPLETED);
        }
    }, [preCountdown, runCountdown]);

    // useEffect(() => {
    //     const currentEvent = rushData.events.find(
    //         (event) => event.rushEventId === rushData.todayEventId
    //     );
    //
    //     if (currentEvent && gameState.phase === CARD_PHASE.COMPLETED) {
    //         const serverTime = getMsTime(rushData.serverTime);
    //         const endTime = getMsTime(currentEvent.endDateTime);
    //
    //         if (!gameState.userParticipatedStatus) {
    //             if (serverTime > endTime) {
    //                 navigate("/rush");
    //                 // TODO: 이벤트 참여기간 아닌 분기 처리(이벤트 종료 후 그 당일 12시 직전까지)
    //             }
    //         } else {
    //             // TODO: 참여한 사람일 경우 당일 12시 직전까지 계속 "COMPLETED" 상태 유지
    //             // TODO: 12시 지나면 다시 "NOT_STARTED" 상태로 변경
    //         }
    //     }
    // }, [gameState.phase, gameState.userParticipatedStatus, rushData, navigate]);

    return (
        <RushGameContext.Provider
            value={{
                gameState,
                preCountdown,
                runCountdown,
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

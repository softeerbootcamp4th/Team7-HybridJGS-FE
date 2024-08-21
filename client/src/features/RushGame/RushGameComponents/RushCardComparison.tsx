import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import RushCard from "@/features/RushGame/RushGameComponents/RushCard.tsx";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import {
    GetRushUserParticipationStatusResponse,
    GetTodayRushEventResponse,
    RushEventStatusCodeResponse,
} from "@/types/rushApi.ts";
import { CardOption } from "@/types/rushGame.ts";
import { getRandomCardColors } from "@/utils/getRandomCardColors.ts";

export default function RushCardComparison() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { gameState, setUserSelectedOption, updateCardOptions, setUserParticipationStatus } =
        useRushGameContext();

    // TODO: getTodayRushEvent -> RushGame 컴포넌트로 옮기기
    const {
        data: todayRushEventData,
        isSuccess: isSuccessTodayRushEvent,
        fetchData: getTodayRushEvent,
    } = useFetch<GetTodayRushEventResponse, string>((token) => RushAPI.getTodayRushEvent(token));

    const {
        data: postSelectedRushOptionResponse,
        isSuccess: isSuccessPostSelectedRushOption,
        fetchData: postSelectedRushOptionApply,
    } = useFetch<RushEventStatusCodeResponse, { token: string; optionId: CardOption }>(
        ({ token, optionId }) => RushAPI.postSelectedRushOptionApply(token, optionId)
    );

    const { data: userParticipatedStatus, fetchData: getRushUserParticipationStatus } = useFetch<
        GetRushUserParticipationStatusResponse,
        string
    >((token) => RushAPI.getRushUserParticipationStatus(token));

    useEffect(() => {
        getTodayRushEvent(cookies[COOKIE_KEY.ACCESS_TOKEN]);
    }, []);

    useEffect(() => {
        if (isSuccessTodayRushEvent && todayRushEventData) {
            const { leftColor, rightColor } = getRandomCardColors();

            updateCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                mainText: todayRushEventData.leftOption.mainText,
                subText: todayRushEventData.leftOption.subText,
                color: leftColor,
            });
            updateCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                mainText: todayRushEventData.rightOption.mainText,
                subText: todayRushEventData.rightOption.subText,
                color: rightColor,
            });
        }
    }, [isSuccessTodayRushEvent, todayRushEventData]);

    const handleCardSelection = async (optionId: CardOption) => {
        await postSelectedRushOptionApply({ token: cookies[COOKIE_KEY.ACCESS_TOKEN], optionId });
        setUserSelectedOption(optionId);
    };

    useEffect(() => {
        if (isSuccessPostSelectedRushOption && postSelectedRushOptionResponse === 204) {
            getRushUserParticipationStatus(cookies[COOKIE_KEY.ACCESS_TOKEN]);
        }
    }, [isSuccessPostSelectedRushOption, postSelectedRushOptionResponse]);

    useEffect(() => {
        if (userParticipatedStatus !== null) {
            setUserParticipationStatus(userParticipatedStatus);
        }
    }, [userParticipatedStatus]);

    const leftOptionData = gameState.cardOptions[CARD_OPTION.LEFT_OPTIONS];
    const rightOptionData = gameState.cardOptions[CARD_OPTION.RIGHT_OPTIONS];

    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard
                color={leftOptionData.color}
                mainText={leftOptionData.mainText}
                subText={leftOptionData.subText}
                onClick={() => handleCardSelection(CARD_OPTION.LEFT_OPTIONS)}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={rightOptionData.color}
                mainText={rightOptionData.mainText}
                subText={rightOptionData.subText}
                onClick={() => handleCardSelection(CARD_OPTION.RIGHT_OPTIONS)}
            />
        </div>
    );
}

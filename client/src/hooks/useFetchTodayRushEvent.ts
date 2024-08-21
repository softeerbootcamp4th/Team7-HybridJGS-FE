import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetTodayRushEventResponse } from "@/types/rushApi.ts";
import { getRandomCardColors } from "@/utils/getRandomCardColors";

export const useFetchTodayRushEvent = () => {
    const { setCardOptions } = useRushGameContext();

    const {
        data: todayRushEventData,
        isSuccess: isSuccessTodayRushEvent,
        fetchData: getTodayRushEvent,
    } = useFetch<GetTodayRushEventResponse, string>((token) => RushAPI.getTodayRushEvent(token));

    useEffect(() => {
        if (isSuccessTodayRushEvent && todayRushEventData) {
            const { leftColor, rightColor } = getRandomCardColors();

            setCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                mainText: todayRushEventData.leftOption.mainText,
                subText: todayRushEventData.leftOption.subText,
                color: leftColor,
            });
            setCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                mainText: todayRushEventData.rightOption.mainText,
                subText: todayRushEventData.rightOption.subText,
                color: rightColor,
            });
        }
    }, [isSuccessTodayRushEvent, todayRushEventData]);

    return { getTodayRushEvent };
};

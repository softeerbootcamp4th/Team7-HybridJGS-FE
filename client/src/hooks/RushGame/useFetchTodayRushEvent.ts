import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import useRushGameDispatchContext from "@/hooks/Contexts/useRushGameDispatchContext.ts";
import useFetch from "@/hooks/useFetch.ts";
import { GetTodayRushEventResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";
import { getRandomCardColors } from "@/utils/getRandomCardColors.ts";

export function useFetchTodayRushEvent() {
    const dispatch = useRushGameDispatchContext();

    const {
        data: todayRushEventData,
        isSuccess: isSuccessTodayRushEvent,
        fetchData: getTodayRushEvent,
    } = useFetch<GetTodayRushEventResponse, string>((token) => RushAPI.getTodayRushEvent(token));

    useEffect(() => {
        if (isSuccessTodayRushEvent && todayRushEventData) {
            const { leftColor, rightColor } = getRandomCardColors();

            dispatch({
                type: RUSH_ACTION.SET_CARD_OPTIONS,
                payload: {
                    option: CARD_OPTION.LEFT_OPTIONS,
                    updates: {
                        mainText: todayRushEventData.leftOption.mainText,
                        subText: todayRushEventData.leftOption.subText,
                        color: leftColor,
                    },
                },
            });

            dispatch({
                type: RUSH_ACTION.SET_CARD_OPTIONS,
                payload: {
                    option: CARD_OPTION.RIGHT_OPTIONS,
                    updates: {
                        mainText: todayRushEventData.rightOption.mainText,
                        subText: todayRushEventData.rightOption.subText,
                        color: rightColor,
                    },
                },
            });
        }
    }, [isSuccessTodayRushEvent, todayRushEventData]);

    return { getTodayRushEvent };
}

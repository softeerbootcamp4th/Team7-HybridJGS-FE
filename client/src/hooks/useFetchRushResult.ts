import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import useFetch from "@/hooks/useFetch.ts";
import useRushGameDispatchContext from "@/hooks/useRushGameDispatchContext.ts";
import { GetRushResultResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";

export function useFetchRushResult() {
    const dispatch = useRushGameDispatchContext();

    const {
        data: resultData,
        isSuccess: isSuccessRushResult,
        fetchData: getRushResult,
    } = useFetch<GetRushResultResponse, string>((token) => RushAPI.getRushResult(token), false);

    useEffect(() => {
        if (resultData && isSuccessRushResult) {
            const { optionId, leftOption, rightOption } = resultData;

            if (optionId) {
                dispatch({ type: RUSH_ACTION.SET_USER_OPTION, payload: optionId });
            }

            dispatch({
                type: RUSH_ACTION.SET_CARD_OPTIONS,
                payload: {
                    option: CARD_OPTION.LEFT_OPTIONS,
                    updates: {
                        selectionCount: leftOption,
                    },
                },
            });

            dispatch({
                type: RUSH_ACTION.SET_CARD_OPTIONS,
                payload: {
                    option: CARD_OPTION.RIGHT_OPTIONS,
                    updates: {
                        selectionCount: rightOption,
                    },
                },
            });
        }
    }, [resultData, isSuccessRushResult]);

    return { getRushResult, resultData };
}

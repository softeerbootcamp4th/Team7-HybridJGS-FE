import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import useFetch from "@/hooks/useFetch.ts";
import useRushGameDispatchContext from "@/hooks/useRushGameDispatchContext.ts";
import useRushGameStateContext from "@/hooks/useRushGameStateContext.ts";
import { GetRushOptionResultResponse } from "@/types/rushApi.ts";
import { CardOption, RUSH_ACTION } from "@/types/rushGame.ts";

export function useFetchRushOptionResult() {
    const gameState = useRushGameStateContext();
    const dispatch = useRushGameDispatchContext();

    const {
        data: userResultData,
        isSuccess: isSuccessUserResultData,
        fetchData: getUserResultData,
    } = useFetch<GetRushOptionResultResponse, { token: string; optionId: CardOption }>(
        ({ token, optionId }) => RushAPI.getRushOptionResult(token, optionId)
    );

    useEffect(() => {
        if (isSuccessUserResultData && userResultData) {
            dispatch({
                type: RUSH_ACTION.SET_CARD_OPTIONS,
                payload: {
                    option: gameState.userSelectedOption,
                    updates: {
                        mainText: userResultData.mainText,
                        resultMainText: userResultData.resultMainText,
                        resultSubText: userResultData.resultSubText,
                    },
                },
            });
        }
    }, [isSuccessUserResultData, userResultData]);

    return { getUserResultData };
}

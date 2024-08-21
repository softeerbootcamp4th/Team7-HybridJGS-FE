import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushOptionResultResponse } from "@/types/rushApi.ts";
import { CardOption } from "@/types/rushGame.ts";

export function useFetchRushOptionResult() {
    const { gameState, setCardOptions } = useRushGameContext();

    const {
        data: userResultData,
        isSuccess: isSuccessUserResultData,
        fetchData: getUserResultData,
    } = useFetch<GetRushOptionResultResponse, { token: string; optionId: CardOption }>(
        ({ token, optionId }) => RushAPI.getRushOptionResult(token, optionId)
    );

    useEffect(() => {
        if (isSuccessUserResultData && userResultData) {
            setCardOptions(gameState.userSelectedOption, {
                mainText: userResultData.mainText,
                resultMainText: userResultData.resultMainText,
                resultSubText: userResultData.resultSubText,
            });
        }
    }, [isSuccessUserResultData, userResultData]);

    return { getUserResultData };
}

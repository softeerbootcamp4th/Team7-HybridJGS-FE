import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushResultResponse } from "@/types/rushApi.ts";

export function useFetchRushResult() {
    const { setUserSelectedOption, setCardOptions } = useRushGameContext();

    const {
        data: resultData,
        isSuccess: isSuccessRushResult,
        fetchData: getRushResult,
    } = useFetch<GetRushResultResponse, string>((token) => RushAPI.getRushResult(token), false);

    useEffect(() => {
        if (resultData && isSuccessRushResult) {
            const { optionId, leftOption, rightOption } = resultData;

            if (optionId) setUserSelectedOption(optionId);

            setCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            setCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        }
    }, [resultData, isSuccessRushResult, setCardOptions]);

    return { getRushResult, resultData };
}

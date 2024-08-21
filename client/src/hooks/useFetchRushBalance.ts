import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useFetch from "@/hooks/useFetch.ts";
import useRushGameDispatchContext from "@/hooks/useRushGameDispatchContext.ts";
import { GetRushBalanceResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";

export default function useFetchRushBalance() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const dispatch = useRushGameDispatchContext();

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
            const { optionId, leftOption, rightOption } = rushBalanceData;

            dispatch({ type: RUSH_ACTION.SET_USER_OPTION, payload: optionId });

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
    }, [isSuccessRushBalance, rushBalanceData]);

    return fetchRushBalance;
}

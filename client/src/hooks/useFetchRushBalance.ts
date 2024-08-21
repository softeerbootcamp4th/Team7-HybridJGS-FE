import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushBalanceResponse } from "@/types/rushApi.ts";

export default function useFetchRushBalance() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { setUserSelectedOption, setCardOptions } = useRushGameContext();

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

            setUserSelectedOption(optionId);

            setCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            setCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        }
    }, [isSuccessRushBalance, rushBalanceData, setUserSelectedOption, setCardOptions]);

    return fetchRushBalance;
}

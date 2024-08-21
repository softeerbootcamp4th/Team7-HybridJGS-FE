import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import useFetch from "@/hooks/useFetch.ts";
import useFetchRushBalance from "@/hooks/useFetchRushBalance.ts";
import useRushGameDispatchContext from "@/hooks/useRushGameDispatchContext.ts";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";

export function useFetchRushUserParticipationStatus() {
    const dispatch = useRushGameDispatchContext();
    const fetchRushBalance = useFetchRushBalance();

    const { data: userParticipatedStatus, fetchData: getRushUserParticipationStatus } = useFetch<
        GetRushUserParticipationStatusResponse,
        string
    >((token) => RushAPI.getRushUserParticipationStatus(token));

    useEffect(() => {
        if (userParticipatedStatus !== null) {
            dispatch({ type: RUSH_ACTION.SET_USER_PARTICIPATION, payload: userParticipatedStatus });
            if (userParticipatedStatus && CARD_PHASE.IN_PROGRESS) {
                fetchRushBalance();
            }
        }
    }, [userParticipatedStatus]);

    return { userParticipatedStatus, getRushUserParticipationStatus };
}

import { useEffect } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import useFetch from "@/hooks/useFetch.ts";
import useFetchRushBalance from "@/hooks/useFetchRushBalance.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushUserParticipationStatusResponse } from "@/types/rushApi.ts";

export function useFetchRushUserParticipationStatus() {
    const { setUserParticipationStatus } = useRushGameContext();
    const fetchRushBalance = useFetchRushBalance();

    const { data: userParticipatedStatus, fetchData: getRushUserParticipationStatus } = useFetch<
        GetRushUserParticipationStatusResponse,
        string
    >((token) => RushAPI.getRushUserParticipationStatus(token));

    useEffect(() => {
        if (userParticipatedStatus !== null) {
            setUserParticipationStatus(userParticipatedStatus);
            if (userParticipatedStatus && CARD_PHASE.IN_PROGRESS) {
                fetchRushBalance();
            }
        }
    }, [userParticipatedStatus]);

    return { userParticipatedStatus, getRushUserParticipationStatus };
}

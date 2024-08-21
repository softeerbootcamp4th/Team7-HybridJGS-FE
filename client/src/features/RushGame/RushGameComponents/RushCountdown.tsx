import { useEffect, useState } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import useCountdown from "@/hooks/useCountdown.ts";
import useFetch from "@/hooks/useFetch.ts";
import useRushGameDispatchContext from "@/hooks/useRushGameDispatchContext.ts";
import useRushGameStateContext from "@/hooks/useRushGameStateContext.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";
import { formatTime } from "@/utils/formatTime.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

function TimeDisplay({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex flex-col justify-center items-center gap-3 w-[116px]">
            <p className="h-detail-1-regular text-n-neutral-500">{label}</p>
            <p className="h-heading-1-bold">{value}</p>
        </span>
    );
}

export default function RushCountdown() {
    const [initialRunCountdown, setInitialRunCountdown] = useState<number | null>(null);
    const gameState = useRushGameStateContext();
    const dispatch = useRushGameDispatchContext();

    const {
        data: rushData,
        isSuccess: isSuccessRush,
        fetchData: getRush,
    } = useFetch<GetTotalRushEventsResponse>(() => RushAPI.getRush());

    useEffect(() => {
        getRush();
    }, []);

    useEffect(() => {
        if (isSuccessRush && rushData) {
            const serverDate = new Date(rushData.serverTime).toISOString().split("T")[0];

            const currentEvent = rushData.events.find((event) => {
                const eventDate = new Date(event.startDateTime).toISOString().split("T")[0];
                return eventDate === serverDate && event.rushEventId === rushData.todayEventId;
            });

            if (currentEvent) {
                const serverTime = getMsTime(rushData.serverTime);
                const endTime = getMsTime(currentEvent.endDateTime);

                setInitialRunCountdown(Math.max(0, Math.floor((endTime - serverTime) / 1000)));
            }
        }
    }, [isSuccessRush, rushData]);

    const runCountdown = useCountdown(initialRunCountdown || null);

    useEffect(() => {
        if (
            runCountdown !== null &&
            runCountdown <= 0 &&
            gameState.phase === CARD_PHASE.IN_PROGRESS
        ) {
            dispatch({ type: RUSH_ACTION.SET_PHASE, payload: CARD_PHASE.COMPLETED });
        }
    }, [runCountdown, gameState.phase]);

    if (initialRunCountdown === null || runCountdown === null) {
        return <div className="flex flex-col gap-3 justify-center items-center h-[150px]"></div>;
    }

    const minutes = Math.floor((runCountdown % 3600) / 60);
    const seconds = runCountdown % 60;

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-[150px]">
            <p className="h-body-2-medium text-n-neutral-500">
                밸런스 게임 결과 공개까지 남은 시간
            </p>
            <div className="flex items-end text-n-neutral-950">
                <TimeDisplay label="Minutes" value={formatTime(minutes)} />
                <p className="h-heading-1-bold">:</p>
                <TimeDisplay label="Seconds" value={formatTime(seconds)} />
            </div>
        </div>
    );
}

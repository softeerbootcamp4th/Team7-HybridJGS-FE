import { useEffect } from "react";
import { CARD_PHASE } from "@/constants/Rush/rushCard";
import { useRushGameStateContext } from "@/hooks/useRushGameStateContext.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { getMsTime } from "@/utils/getMsTime";

export default function useSetGamePhase(rushData: GetTotalRushEventsResponse) {
    const { setGamePhase } = useRushGameStateContext();

    useEffect(() => {
        if (rushData) {
            const serverDate = new Date(rushData.serverTime).toISOString().split("T")[0];

            const currentEvent = rushData.events.find((event) => {
                const eventDate = new Date(event.startDateTime).toISOString().split("T")[0];
                return eventDate === serverDate && event.rushEventId === rushData.todayEventId;
            });

            if (currentEvent) {
                const serverTime = getMsTime(rushData.serverTime);
                const startTime = getMsTime(currentEvent.startDateTime);
                const endTime = getMsTime(currentEvent.endDateTime);

                if (serverTime < startTime) {
                    setGamePhase(CARD_PHASE.NOT_STARTED);
                } else if (serverTime >= startTime && serverTime <= endTime) {
                    setGamePhase(CARD_PHASE.IN_PROGRESS);
                } else if (serverTime > endTime) {
                    setGamePhase(CARD_PHASE.COMPLETED);
                }
            }
        }
    }, [rushData]);
}

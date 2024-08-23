import { useEffect } from "react";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import useRushGameDispatchContext from "@/hooks/Contexts/useRushGameDispatchContext.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { RUSH_ACTION } from "@/types/rushGame.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

export default function useSetGamePhase(rushData: GetTotalRushEventsResponse) {
    const dispatch = useRushGameDispatchContext();

    useEffect(() => {
        if (rushData) {
            const currentEvent = rushData.events.find((event) => {
                return event.rushEventId === rushData.todayEventId;
            });

            if (currentEvent) {
                const serverTime = getMsTime(rushData.serverTime);
                const startTime = getMsTime(currentEvent.startDateTime);
                const endTime = getMsTime(currentEvent.endDateTime);

                if (serverTime < startTime) {
                    dispatch({ type: RUSH_ACTION.SET_PHASE, payload: CARD_PHASE.NOT_STARTED });
                } else if (serverTime >= startTime && serverTime <= endTime) {
                    dispatch({ type: RUSH_ACTION.SET_PHASE, payload: CARD_PHASE.IN_PROGRESS });
                } else if (serverTime > endTime) {
                    dispatch({ type: RUSH_ACTION.SET_PHASE, payload: CARD_PHASE.COMPLETED });
                }
            }
        }
    }, [rushData]);
}

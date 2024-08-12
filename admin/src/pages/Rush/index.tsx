import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import TabHeader from "@/components/TabHeader";
import EventList from "@/features/Rush/EventList";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import { RUSH_ACTION } from "@/types/rush";
import { GetRushEventResponse } from "@/types/rushApi";

export default function Rush() {
    const dispatch = useRushEventDispatchContext();

    const rushEvent = useLoaderData() as GetRushEventResponse;

    useEffect(() => {
        dispatch({
            type: RUSH_ACTION.SET_EVENT_LIST,
            payload: rushEvent,
        });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <TabHeader />

            <EventList />
        </div>
    );
}

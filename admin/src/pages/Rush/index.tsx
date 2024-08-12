import { useCallback, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import TabHeader from "@/components/TabHeader";
import { QUERY_OPTION } from "@/constants/rush";
import EventList from "@/features/Rush/EventList";
import RushPrizeForm from "@/features/Rush/RushPrizeForm";
import RushSelectForm from "@/features/Rush/RushSelectForm";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import { RUSH_ACTION } from "@/types/rush";
import { GetRushEventResponse } from "@/types/rushApi";

export default function Rush() {
    const [searchParams] = useSearchParams();
    const dispatch = useRushEventDispatchContext();

    const rushEvent = useLoaderData() as GetRushEventResponse;

    const query = searchParams.get("q");

    useEffect(() => {
        dispatch({
            type: RUSH_ACTION.SET_EVENT_LIST,
            payload: rushEvent,
        });
    }, []);

    const renderElement = useCallback(() => {
        if (query === QUERY_OPTION.OPTION) {
            return <RushSelectForm />;
        } else if (query === QUERY_OPTION.PRIZE) {
            return <RushPrizeForm />;
        }

        return <EventList />;
    }, [query, rushEvent]);

    return (
        <div className="flex flex-col items-center">
            <TabHeader />

            {renderElement()}
        </div>
    );
}

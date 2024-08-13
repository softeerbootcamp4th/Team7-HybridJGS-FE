import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI";
import TabHeader from "@/components/TabHeader";
import { QUERY_OPTION } from "@/constants/rush";
import EventList from "@/features/Rush/EventList";
import RushPrizeForm from "@/features/Rush/RushPrizeForm";
import RushSelectForm from "@/features/Rush/RushSelectForm";
import useFetch from "@/hooks/useFetch";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import { RUSH_ACTION } from "@/types/rush";
import { GetRushEventResponse } from "@/types/rushApi";

export default function Rush() {
    const [searchParams] = useSearchParams();
    const dispatch = useRushEventDispatchContext();

    const {
        data: rushEvent,
        isSuccess: isSuccessGetRushEvent,
        fetchData: getRushEvent,
    } = useFetch<GetRushEventResponse>((_, token) => RushAPI.getRush(token ?? ""));

    const query = searchParams.get("q");

    useEffect(() => {
        getRushEvent();
    }, []);
    useEffect(() => {
        if (rushEvent && isSuccessGetRushEvent) {
            dispatch({
                type: RUSH_ACTION.SET_EVENT_LIST,
                payload: rushEvent,
            });
        }
    }, [rushEvent, isSuccessGetRushEvent]);

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

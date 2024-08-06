import { useEffect } from "react";
import TabHeader from "@/components/TabHeader";
import ApplicantList from "@/features/Rush/ApplicantList";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import { RUSH_ACTION } from "@/types/rush";

export default function Rush() {
    const dispatch = useRushEventDispatchContext();

    useEffect(() => {
        // TODO: 데이터 패칭 로직 구현
        dispatch({
            type: RUSH_ACTION.SET_EVENT_LIST,
            payload: [
                {
                    rush_event_id: 1,
                    event_date: "2024-07-25",
                    open_time: "20:00:00",
                    close_time: "20:10:00",
                    winner_count: 315,
                    prize_image_url: "prize1.png",
                    prize_description: "스타벅스 1만원 기프트카드",
                },
                {
                    rush_event_id: 2,
                    event_date: "2024-07-26",
                    open_time: "20:00:00",
                    close_time: "20:10:00",
                    winner_count: 315,
                    prize_image_url: "prize2.png",
                    prize_description: "올리브영 1만원 기프트카드",
                },
                {
                    rush_event_id: 2,
                    event_date: "2024-07-27",
                    open_time: "20:00:00",
                    close_time: "20:10:00",
                    winner_count: 315,
                    prize_image_url: "prize3.png",
                    prize_description: "배달의 민족 1만원 기프트카드",
                },
            ],
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center">
                <TabHeader />

                <ApplicantList />
            </div>
        </>
    );
}

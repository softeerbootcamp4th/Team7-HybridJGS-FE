import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabHeader from "@/components/TabHeader";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import { RUSH_ACTION } from "@/types/rush";

export default function Rush() {
    const navigate = useNavigate();
    const dispatch = useRushEventDispatchContext();

    useEffect(() => {
        // TODO: 데이터 패칭 로직 구현
        dispatch({
            type: RUSH_ACTION.SET_EVENT_LIST,
            payload: [
                {
                    rushEventId: 1,
                    eventDate: "2024-07-25",
                    openTime: "20:00:00",
                    closeTime: "20:10:00",
                    winnerCount: 315,
                    prizeImageUrl: "prize1.png",
                    prizeDescription: "스타벅스 1만원 기프트카드",
                },
                {
                    rushEventId: 2,
                    eventDate: "2024-07-26",
                    openTime: "20:00:00",
                    closeTime: "20:10:00",
                    winnerCount: 315,
                    prizeImageUrl: "prize2.png",
                    prizeDescription: "올리브영 1만원 기프트카드",
                },
                {
                    rushEventId: 2,
                    eventDate: "2024-07-27",
                    openTime: "20:00:00",
                    closeTime: "20:10:00",
                    winnerCount: 315,
                    prizeImageUrl: "prize3.png",
                    prizeDescription: "배달의 민족 1만원 기프트카드",
                },
            ],
        });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <TabHeader />

            <button onClick={() => navigate("/rush/winner-list", { state: { id: 1 } })}>
                To Go Winner List
            </button>
        </div>
    );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { EVENT_LIST_HEADER } from "@/constants/rush";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";
import { getTimeDifference } from "@/utils/getTimeDifference";

export default function EventList() {
    const navigate = useNavigate();

    const { rushList } = useRushEventStateContext();
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

    const handleChangeItem = (key: string, changeIdx: number, text: string | number) => {
        const updatedTableItemList = rushList.map((item, idx) => {
            if (idx === changeIdx) {
                return { ...item, [key]: text };
            }
            return { ...item };
        });

        dispatch({ type: RUSH_ACTION.SET_EVENT_LIST, payload: updatedTableItemList });
    };

    const getTableData = () => {
        return rushList.map((item, idx) => {
            return [
                item.rushEventId,
                <DatePicker
                    date={item.eventDate}
                    onChangeDate={(date) => handleChangeItem("eventDate", idx, date)}
                />,
                <TimePicker
                    time={item.openTime}
                    onChangeTime={(time) => handleChangeItem("openTime", idx, time)}
                />,
                <TimePicker
                    time={item.closeTime}
                    onChangeTime={(time) => handleChangeItem("closeTime", idx, time)}
                />,
                getTimeDifference(item.openTime, item.closeTime),
                <Button
                    buttonSize="sm"
                    onClick={() =>
                        navigate("/rush/select-form", { state: { id: item.rushEventId } })
                    }
                >
                    선택지 관리
                </Button>,
                <Button
                    buttonSize="sm"
                    onClick={() =>
                        navigate("/rush/prize-form", { state: { id: item.rushEventId } })
                    }
                >
                    경품 관리
                </Button>,
                <div className="flex w-full border-b">
                    <input
                        value={item.winnerCount}
                        onChange={(e) =>
                            handleChangeItem("winnerCount", idx, parseInt(e.target.value) || 0)
                        }
                    />
                </div>,
                "오픈 전",
                <Button
                    buttonSize="sm"
                    onClick={() =>
                        navigate("/rush/winner-list", { state: { id: item.rushEventId } })
                    }
                >
                    참여자 리스트 보기
                </Button>,
                <Button buttonSize="sm">삭제</Button>,
            ];
        });
    };

    return (
        <div className="w-[1560px] flex flex-col items-center mt-10 gap-4">
            <div className="self-start">
                <Button buttonSize="sm">이벤트 진행 날짜 추가</Button>
            </div>

            <Table headers={EVENT_LIST_HEADER} data={getTableData()} />

            <Button buttonSize="lg">수정사항 업데이트</Button>
        </div>
    );
}

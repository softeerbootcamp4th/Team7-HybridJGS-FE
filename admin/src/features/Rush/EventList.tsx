import { useEffect } from "react";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { RUSH_SECTION, RushSectionType } from "@/constants/rush";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";
import { getTimeDifference } from "@/utils/getTimeDifference";

interface EventListProps {
    handleSelectSection: (idx: number, section: RushSectionType) => void;
}

const EVENT_LIST_HEADER = [
    "ID",
    "이벤트 진행 날짜",
    "오픈 시간",
    "종료 시간",
    "활성화 시간",
    "선택지 관리",
    "경품 관리",
    "선착순 당첨 인원 수",
    "진행 상태",
    "참여자 리스트 보기",
    "관리",
];

export default function EventList({ handleSelectSection }: EventListProps) {
    const { rushList } = useRushEventStateContext();
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

    const handleChangeItem = (key: string, changeIdx: number, date: string) => {
        const updatedTableItemList = rushList.map((item, idx) => {
            if (idx === changeIdx) {
                return { ...item, [key]: date };
            }
            return { ...item };
        });

        dispatch({ type: RUSH_ACTION.SET_EVENT_LIST, payload: updatedTableItemList });
    };

    const getTableData = () => {
        return rushList.map((item, idx) => {
            return [
                item.rush_event_id,
                <DatePicker
                    date={item.event_date}
                    onChangeDate={(date) => handleChangeItem("event_date", idx, date)}
                />,
                <TimePicker
                    time={item.open_time}
                    onChangeTime={(time) => handleChangeItem("open_time", idx, time)}
                />,
                <TimePicker
                    time={item.close_time}
                    onChangeTime={(time) => handleChangeItem("close_time", idx, time)}
                />,
                getTimeDifference(item.open_time, item.close_time),
                <Button buttonSize="sm">선택지 관리</Button>,
                <Button buttonSize="sm">경품 관리</Button>,
                <div className="flex justify-between">
                    <p>{item.winner_count}</p>
                    <p>편집</p>
                </div>,
                "오픈 전",
                <Button
                    buttonSize="sm"
                    onClick={() => handleSelectSection(idx, RUSH_SECTION.APPLICANT_LIST)}
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

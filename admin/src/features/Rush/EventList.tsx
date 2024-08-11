import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";
import { getTimeDifference } from "@/utils/getTimeDifference";

interface EventListProps {}

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

export default function EventList({}: EventListProps) {
    const navigate = useNavigate();

    const { rushList } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

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

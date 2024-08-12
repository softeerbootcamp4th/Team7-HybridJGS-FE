import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { EVENT_LIST_HEADER, RUSH_STATUS_MAP } from "@/constants/rush";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RUSH_ACTION } from "@/types/rush";
import { getTimeDifference } from "@/utils/getTimeDifference";

export default function EventList() {
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
                RUSH_STATUS_MAP[item.status],
                <Button
                    buttonSize="sm"
                    onClick={() =>
                        navigate("/rush/winner-list", { state: { id: item.rushEventId } })
                    }
                >
                    참여자 리스트 보기
                </Button>,
            ];
        });
    };

    return (
        <div className="w-[1560px] flex flex-col items-center mt-10 gap-4">
            <div className="mt-4">
                <Table headers={EVENT_LIST_HEADER} data={getTableData()} />
            </div>

            <Button buttonSize="lg">수정사항 업데이트</Button>
        </div>
    );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { EVENT_STATUS, STATUS_MAP } from "@/constants/common";
import { EVENT_LIST_HEADER, QUERY_OPTION } from "@/constants/rush";
import useFetch from "@/hooks/useFetch";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import useToast from "@/hooks/useToast";
import { RUSH_ACTION } from "@/types/rush";
import { PutRushEventResponse } from "@/types/rushApi";
import { getMsTime } from "@/utils/getMsTime";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { validateDateTime } from "@/utils/validateDateTime";

export default function EventList() {
    const navigate = useNavigate();

    const { showToast, ToastComponent } = useToast("수정 사항이 반영되었습니다!");

    const { rushList } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    const { isSuccess: isSuccessPutRush, fetchData: putRush } = useFetch<PutRushEventResponse>(
        (_, token) => RushAPI.putRush(rushList, token)
    );

    useEffect(() => {
        if (isSuccessPutRush) {
            showToast();
        }
    }, [isSuccessPutRush]);

    const handleChangeDate = (changeIdx: number, newDate: string) => {
        const selectedItem = rushList[changeIdx];
        const selectedTime = selectedItem.startTime || "00:00";
        const selectedDateTime = getMsTime(`${newDate}T${selectedTime}`);
        const currentTime = new Date().getTime();
        const endDateTime = getMsTime(`${newDate}T${selectedItem.endTime || "23:59"}`);

        const errorMessage = validateDateTime(
            "startDate",
            selectedDateTime,
            endDateTime,
            currentTime
        );
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        handleChangeItem("eventDate", changeIdx, newDate);
    };

    const handleChangeTime = (
        key: "startTime" | "endTime",
        changeIdx: number,
        newTime: string | number
    ) => {
        const selectedItem = rushList[changeIdx];
        const selectedDate = selectedItem.eventDate;

        const selectedDateTime = getMsTime(`${selectedDate}T${newTime}`);
        const currentTime = new Date().getTime();
        const startDateTime = getMsTime(`${selectedItem.eventDate}T${selectedItem.startTime}`);
        const endDateTime = getMsTime(`${selectedDate}T${selectedItem.endTime}`);

        const errorMessage = validateDateTime(
            key,
            key === "startTime" ? selectedDateTime : startDateTime,
            key === "endTime" ? selectedDateTime : endDateTime,
            currentTime
        );

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        handleChangeItem(key, changeIdx, newTime);
    };

    const handleChangeItem = (key: string, changeIdx: number, text: string | number) => {
        const updatedTableItemList = rushList.map((item, idx) => {
            if (idx === changeIdx) {
                return { ...item, [key]: text };
            }
            return { ...item };
        });

        dispatch({ type: RUSH_ACTION.SET_EVENT_LIST, payload: updatedTableItemList });
    };

    const handleUpdate = () => {
        putRush();
    };

    const getTableData = () => {
        return rushList.map((item, idx) => {
            const canEdit = item.status !== EVENT_STATUS.BEFORE;
            return [
                item.rushEventId,
                <DatePicker
                    disabled={canEdit}
                    date={item.eventDate}
                    onChangeDate={(date) => handleChangeDate(idx, date)}
                />,
                <TimePicker
                    disabled={canEdit}
                    time={item.startTime}
                    onChangeTime={(time) => handleChangeTime("startTime", idx, time)}
                />,
                <TimePicker
                    disabled={canEdit}
                    time={item.endTime}
                    onChangeTime={(time) => handleChangeTime("endTime", idx, time)}
                />,
                getTimeDifference(item.startTime, item.endTime),
                <Button
                    disabled={canEdit}
                    buttonSize="sm"
                    onClick={() => navigate(`/rush?q=${QUERY_OPTION.OPTION}`, { state: { idx } })}
                >
                    선택지 관리
                </Button>,
                <Button
                    disabled={canEdit}
                    buttonSize="sm"
                    onClick={() => navigate(`/rush?q=${QUERY_OPTION.PRIZE}`, { state: { idx } })}
                >
                    경품 관리
                </Button>,
                <div className="flex w-full border-b">
                    <input
                        disabled={canEdit}
                        value={item.winnerCount}
                        onChange={(e) =>
                            handleChangeItem("winnerCount", idx, parseInt(e.target.value) || 0)
                        }
                    />
                </div>,
                STATUS_MAP[item.status],
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

            <Button buttonSize="lg" onClick={handleUpdate}>
                수정사항 업데이트
            </Button>

            {ToastComponent}
        </div>
    );
}

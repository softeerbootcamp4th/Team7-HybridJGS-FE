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
import { getTimeDifference } from "@/utils/getTimeDifference";

export default function EventList() {
    const navigate = useNavigate();

    const { showToast, ToastComponent } = useToast("수정 사항이 반영되었습니다!");

    const { rushList } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    const { isSuccess: isSuccessPutRush, fetchData: putRush } = useFetch<PutRushEventResponse>(
        (_, token) => RushAPI.putRush(getFormData(), token ?? "")
    );

    useEffect(() => {
        if (isSuccessPutRush) {
            showToast();
        }
    }, [isSuccessPutRush]);

    const getFormData = () => {
        return rushList.map((rush) => {
            const formData = new FormData();
            Object.entries(rush).forEach(([key, value]) => {
                if (typeof value === "object") {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        formData.append(`${key}[${subKey}]`, subValue as Blob);
                    });
                } else {
                    formData.append(key, value.toString());
                }
            });
            return formData;
        });
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
                    onChangeDate={(date) => handleChangeItem("eventDate", idx, date)}
                />,
                <TimePicker
                    disabled={canEdit}
                    time={item.startTime}
                    onChangeTime={(time) => handleChangeItem("startTime", idx, time)}
                />,
                <TimePicker
                    disabled={canEdit}
                    time={item.endTime}
                    onChangeTime={(time) => handleChangeItem("endTime", idx, time)}
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { EVENT_STATUS, STATUS_MAP } from "@/constants/common";
import { LOTTERY_HEADER } from "@/constants/lottery";
import useFetch from "@/hooks/useFetch";
import useToast from "@/hooks/useToast";
import { LotteryEventType } from "@/types/lottery";
import { GetLotteryResponse, PutLotteryResponse } from "@/types/lotteryApi";
import { getDateDifference } from "@/utils/getDateDifference";
import { getMsTime } from "@/utils/getMsTime";
import { validateDateTime } from "@/utils/validateDateTime";

export default function Lottery() {
    const navigate = useNavigate();

    const { showToast, ToastComponent } = useToast("수정 사항이 반영되었습니다!");

    const [lottery, setLottery] = useState<LotteryEventType>({} as LotteryEventType);

    const {
        data: lotteryEvent,
        isSuccess: isSuccessGetLotteryEvent,
        fetchData: getLotteryEvent,
    } = useFetch<GetLotteryResponse>((_, token) => LotteryAPI.getLottery(token));

    const { isSuccess: isSuccessPostLottery, fetchData: postLottery } =
        useFetch<PutLotteryResponse>((_, token) =>
            LotteryAPI.putLottery(
                {
                    startDate: lottery.startDate,
                    startTime: lottery.startTime,
                    endDate: lottery.endDate,
                    endTime: lottery.endTime,
                    winnerCount: lottery.winnerCount,
                },
                token
            )
        );

    useEffect(() => {
        getLotteryEvent();
    }, []);
    useEffect(() => {
        if (lotteryEvent && isSuccessGetLotteryEvent) {
            setLottery(lotteryEvent);
        }
    }, [lotteryEvent, isSuccessGetLotteryEvent]);
    useEffect(() => {
        if (isSuccessPostLottery) {
            showToast();
        }
    }, [isSuccessPostLottery]);

    const handleChangeItem = (key: string, text: string | number) => {
        if (
            lottery.status === EVENT_STATUS.DURING &&
            (key === "startDate" || key === "startTime")
        ) {
            alert("활성화된 이벤트의 시작 날짜와 시간을 수정할 수 없습니다!");
            return;
        }

        const newLottery = { ...lottery, [key]: text };

        const startDateTime = getMsTime(`${newLottery.startDate}T${newLottery.startTime}`);
        const endDateTime = getMsTime(`${newLottery.endDate}T${newLottery.endTime}`);
        const currentDateTime = new Date().getTime();

        const errorMessage = validateDateTime(key, startDateTime, endDateTime, currentDateTime);
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        setLottery(newLottery);
    };

    const getLotteryData = () => {
        return [
            [
                <DatePicker
                    date={lottery.startDate}
                    onChangeDate={(date) => handleChangeItem("startDate", date)}
                />,
                <TimePicker
                    time={lottery.startTime}
                    onChangeTime={(time) => handleChangeItem("startTime", time)}
                />,
                <DatePicker
                    date={lottery.endDate}
                    onChangeDate={(date) => handleChangeItem("endDate", date)}
                />,
                <TimePicker
                    time={lottery.endTime}
                    onChangeTime={(time) => handleChangeItem("endTime", time)}
                />,
                getDateDifference(lottery.startDate, lottery.endDate),
                <div className="border-b flex w-full">
                    <input
                        value={lottery.winnerCount}
                        onChange={(e) =>
                            handleChangeItem("winnerCount", parseInt(e.target.value) || 0)
                        }
                    />
                </div>,
                STATUS_MAP[lottery.status],
            ],
        ];
    };

    const handleUpdate = () => {
        postLottery();
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="flex flex-col h-full items-center justify-center gap-8 pb-40">
                <Table headers={LOTTERY_HEADER} data={getLotteryData()} height="auto" />

                <div className="self-end flex gap-4">
                    <Button buttonSize="sm" onClick={() => navigate("/lottery/participant-list")}>
                        참여자 리스트 보러가기
                    </Button>
                    <Button buttonSize="sm" onClick={() => navigate("/lottery/winner")}>
                        당첨자 추첨하기
                    </Button>
                    <Button buttonSize="sm" onClick={() => navigate("/lottery/winner-list")}>
                        당첨자 보러가기
                    </Button>
                </div>

                <Button buttonSize="lg" onClick={handleUpdate}>
                    수정사항 업데이트
                </Button>
            </div>

            {ToastComponent}
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import TimePicker from "@/components/TimePicker";
import { LOTTERY_HEADER } from "@/constants/lottery";
import { LotteryType } from "@/types/lottery";

export default function Lottery() {
    const navigate = useNavigate();

    const [lottery, setLottery] = useState<LotteryType>({} as LotteryType);

    useEffect(() => {
        const data = {
            lotteryEventId: 1,
            startDate: "2024-07-26 00:00",
            endDate: "2024-08-25 23:59",
            appliedCount: 1000000,
            winnerCount: 363,
        };

        const [startDate, startTime] = data.startDate.split(" ");
        const [endDate, endTime] = data.startDate.split(" ");

        setLottery({
            ...data,
            startDate,
            startTime,
            endDate,
            endTime,
        });
    }, []);

    const handleChangeItem = (key: string, text: string | number) => {
        setLottery({ ...lottery, [key]: text });
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
                "61일",
                <div className="border-b flex w-full">
                    <input
                        value={lottery.winnerCount}
                        onChange={(e) =>
                            handleChangeItem("winnerCount", parseInt(e.target.value) || 0)
                        }
                    />
                </div>,
                "활성화",
            ],
        ];
    };

    const handleUpdate = () => {
        // TODO: update API 요청
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
                    <Button buttonSize="sm" onClick={() => navigate("/lottery/winner-list")}>
                        당첨자 보러가기
                    </Button>
                </div>

                <Button buttonSize="lg" onClick={handleUpdate}>
                    수정사항 업데이트
                </Button>
            </div>
        </div>
    );
}

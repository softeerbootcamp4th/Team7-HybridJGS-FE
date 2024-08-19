import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import useFetch from "@/hooks/useFetch";
import { LotteryEventType } from "@/types/lottery";
import { GetLotteryResponse, PostLotteryWinnerResponse } from "@/types/lotteryApi";

export default function LotteryWinner() {
    const navigate = useNavigate();

    const [currentLottery, setCurrentLottery] = useState<LotteryEventType>({} as LotteryEventType);

    const {
        data: lotteryEvent,
        isSuccess: isSuccessGetLotteryEvent,
        fetchData: getLotteryEvent,
    } = useFetch<GetLotteryResponse>((_, token) => LotteryAPI.getLottery(token));

    const { isSuccess: isSuccessPostLottery, fetchData: postLottery } =
        useFetch<PostLotteryWinnerResponse>((_, token) => LotteryAPI.postLotteryWinner(token));

    useEffect(() => {
        getLotteryEvent();
    }, []);
    useEffect(() => {
        if (lotteryEvent && isSuccessGetLotteryEvent) {
            setCurrentLottery(lotteryEvent);
        }
    }, [lotteryEvent, isSuccessGetLotteryEvent]);
    useEffect(() => {
        if (isSuccessPostLottery) {
            navigate("/lottery/winner-list");
        }
    }, [isSuccessPostLottery]);

    const handleLottery = () => {
        postLottery();
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="flex flex-col h-full items-center justify-center gap-8 pb-40">
                <div className="flex border">
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">전체 참여자 수</p>
                    <p className="px-6 py-4 w-[200px] h-body-1-regular">
                        {currentLottery.appliedCount}
                    </p>
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">당첨자 수</p>
                    <p className="px-6 py-4 w-[200px] h-body-1-regular">
                        {currentLottery.winnerCount}
                    </p>
                </div>

                <Button buttonSize="lg" onClick={handleLottery}>
                    당첨자 추첨하기
                </Button>
            </div>
        </div>
    );
}

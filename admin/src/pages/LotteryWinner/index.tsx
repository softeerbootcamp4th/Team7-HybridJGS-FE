import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import useFetch from "@/hooks/useFetch";
import { LotteryEventType } from "@/types/lottery";
import { GetLotteryResponse, PostLotteryWinnerResponse } from "@/types/lotteryApi";

export default function LotteryWinner() {
    const lottery = useLoaderData() as GetLotteryResponse;

    const navigate = useNavigate();

    const [currentLottery, setCurrentLottery] = useState<LotteryEventType>({} as LotteryEventType);

    const { isSuccess: isSuccessPostLottery, fetchData: postLottery } =
        useFetch<PostLotteryWinnerResponse>(() => LotteryAPI.postLotteryWinner());

    useEffect(() => {
        if (lottery.length !== 0) {
            setCurrentLottery(lottery[0]);
        }
    }, [lottery]);
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
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">
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

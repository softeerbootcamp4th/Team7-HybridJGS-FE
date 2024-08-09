import { ChangeEvent, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import useFetch from "@/hooks/useFetch";
import { GetLotteryResponse, PostLotteryResponse } from "@/types/lottery";

export default function Lottery() {
    const lottery = useLoaderData() as GetLotteryResponse;
    const lotteryId = lottery.length !== 0 ? lottery[0].lotteryEventId : -1;

    const navigate = useNavigate();

    const [totalCount, setTotalCount] = useState<number>(0);
    const [giftCount, setGiftCount] = useState<number>(0);

    const { isSuccess: isSuccessPostLottery, fetchData: postLottery } =
        useFetch<PostLotteryResponse>(() => LotteryAPI.postLotteryWinner({ id: lotteryId }));

    useEffect(() => {
        if (lottery.length !== 0) {
            const currentLotttery = lottery[0];
            setGiftCount(currentLotttery.winnerCount);
            setTotalCount(currentLotttery.appliedCount);
        }
    }, [lottery]);
    useEffect(() => {
        if (isSuccessPostLottery) {
            navigate("/lottery/winner");
        }
    }, [isSuccessPostLottery]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value);
        setGiftCount(count || 0);
    };

    const handleLottery = () => {
        postLottery();
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="flex flex-col h-full items-center justify-center gap-8 pb-40">
                <div className="flex border">
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">전체 참여자 수</p>
                    <p className="px-6 py-4 w-[200px] h-body-1-regular">{totalCount}</p>
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">당첨자 수</p>
                    <div className="self-center px-4">
                        <input value={giftCount} onChange={handleChangeInput} />
                    </div>
                </div>

                <Button buttonSize="lg" onClick={handleLottery}>
                    당첨자 추첨하기
                </Button>
            </div>
        </div>
    );
}

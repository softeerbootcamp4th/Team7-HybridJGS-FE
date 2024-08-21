import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import Suspense from "@/components/Suspense";
import TabHeader from "@/components/TabHeader";
import useFetch from "@/hooks/useFetch";
import { LotteryEventType } from "@/types/lottery";
import {
    DeleteLotteryWinnerResponse,
    GetLotteryResponse,
    PostLotteryWinnerResponse,
} from "@/types/lotteryApi";

export default function LotteryWinner() {
    const navigate = useNavigate();

    const [currentLottery, setCurrentLottery] = useState<LotteryEventType>({} as LotteryEventType);

    const {
        data: lotteryEvent,
        isSuccess: isSuccessGetLotteryEvent,
        fetchData: getLotteryEvent,
    } = useFetch<GetLotteryResponse>((_, token) => LotteryAPI.getLottery(token));

    const {
        isSuccess: isSuccessPostLottery,
        isLoading: isLoadingPostLottery,
        isError: isErrorPostLottery,
        fetchData: postLottery,
    } = useFetch<PostLotteryWinnerResponse>(
        (_, token) => LotteryAPI.postLotteryWinner(token),
        false
    );

    const { isSuccess: isSuccessDeleteLottery, fetchData: deleteLottery } =
        useFetch<DeleteLotteryWinnerResponse>(
            (_, token) => LotteryAPI.deleteLotteryWinner(token),
            false
        );

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
    useEffect(() => {
        if (isErrorPostLottery) {
            const isDelete = confirm("이미 추첨한 이벤트입니다. 삭제 후 다시 추첨하시겠습니까?");
            if (isDelete) {
                deleteLottery();
            }
        }
    }, [isErrorPostLottery]);
    useEffect(() => {
        if (isSuccessDeleteLottery) {
            postLottery();
        }
    }, [isSuccessDeleteLottery]);

    const handleLottery = () => {
        postLottery();
    };

    return (
        <Suspense isLoading={isLoadingPostLottery}>
            <div className="flex flex-col items-center h-screen">
                <TabHeader />

                <div className="flex flex-col h-full items-center justify-center gap-8 pb-40">
                    <div className="flex border">
                        <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">
                            전체 참여자 수
                        </p>
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
        </Suspense>
    );
}

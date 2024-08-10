import { useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { GetLotteryWinnerResponse } from "@/types/lottery";

const LOTTERY_WINNER_HEADER = [
    "등수",
    "ID",
    "전화번호",
    "공유 링크 클릭 횟수",
    "기대평 작성 여부",
    "총 응모 횟수",
];

export default function LotteryWinner() {
    const location = useLocation();
    const navigate = useNavigate();

    const lotteryId = location.state.id;

    if (!lotteryId) {
        navigate("/");
        return null;
    }

    const {
        data: winnerInfo,
        isSuccess: isSuccessGetLotteryWinner,
        fetchNextPage: getWinnerInfo,
    } = useInfiniteFetch({
        fetch: (pageParam: number) =>
            LotteryAPI.getLotteryWinner({ id: lotteryId, size: 10, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (currentPageParam: number, lastPage: GetLotteryWinnerResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });
    const winnerList = useMemo(
        () =>
            winnerInfo.map((winner, idx) => [
                idx + 1,
                winner.id,
                winner.phoneNumber,
                winner.linkClickedCounts,
                winner.expectation,
                winner.appliedCount,
            ]),
        [winnerInfo]
    );

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getWinnerInfo,
        enabled: isSuccessGetLotteryWinner,
    });

    const handleLottery = () => {
        navigate("/lottery");
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="w-[1560px] flex flex-col items-center justify-center gap-8 mt-10">
                <div className="flex items-center gap-2 self-start">
                    <img
                        alt="뒤로 가기 버튼"
                        src="/assets/icons/left-arrow.svg"
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <p className="h-body-1-medium">당첨자 추첨</p>
                </div>

                <Table
                    ref={tableContainerRef}
                    headers={LOTTERY_WINNER_HEADER}
                    data={winnerList}
                    dataLastItem={targetRef}
                />

                <Button buttonSize="lg" onClick={handleLottery}>
                    당첨자 다시 추첨하기
                </Button>
            </div>
        </div>
    );
}

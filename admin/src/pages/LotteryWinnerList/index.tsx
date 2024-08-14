import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import { COOKIE_KEY } from "@/constants/cookie";
import { LOTTERY_EXPECTATIONS_HEADER, LOTTERY_WINNER_HEADER } from "@/constants/lottery";
import useFetch from "@/hooks/useFetch";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { LotteryExpectationsType, LotteryWinnerType } from "@/types/lottery";
import { GetLotteryExpectationsResponse, GetLotteryWinnerResponse } from "@/types/lotteryApi";

export default function LotteryWinnerList() {
    const navigate = useNavigate();

    const [cookies] = useCookies();

    const { showToast, ToastComponent } = useToast("수정 사항이 반영됐습니다!");
    const { handleOpenModal, ModalComponent } = useModal();

    const [selectedWinnerId, setSelectedWinnerId] = useState<number>(0);
    const [selectedExpectations, setSelectedExpectations] = useState<LotteryExpectationsType[]>([]);
    const phoneNumberRef = useRef<string>("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);

    const {
        data: winnerInfo,
        isSuccess: isSuccessGetLotteryWinner,
        fetchNextPage: getWinnerInfo,
        refetch: refetchWinnerInfo,
    } = useInfiniteFetch<LotteryWinnerType, GetLotteryWinnerResponse>({
        fetch: (pageParam: number) =>
            LotteryAPI.getLotteryWinner(
                {
                    size: 10,
                    page: pageParam,
                    phoneNumber: phoneNumberRef.current,
                },
                cookies[COOKIE_KEY.ACCESS_TOKEN]
            ),
        initialPageParam: 0,
        getNextPageParam: (currentPageParam: number, lastPage: GetLotteryWinnerResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });

    const {
        data: expectation,
        isSuccess: isSuccessGetLotteryExpectation,
        fetchNextPage: getLotteryExpectation,
        refetch: refetchLotteryExpectation,
    } = useInfiniteFetch<LotteryExpectationsType, GetLotteryExpectationsResponse>({
        fetch: (pageParam: number) =>
            LotteryAPI.getLotteryExpectations(
                {
                    participantId: selectedWinnerId,
                    size: 10,
                    page: pageParam,
                },
                cookies[COOKIE_KEY.ACCESS_TOKEN]
            ),
        initialPageParam: 0,
        getNextPageParam: (currentPageParam: number, lastPage: GetLotteryExpectationsResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });

    const { isSuccess: isSuccessPatchLotteryExpectation, fetchData: patchLotteryExpectation } =
        useFetch<{}, number>((casperId: number, token) =>
            LotteryAPI.patchLotteryExpectation(
                {
                    casperId,
                },
                token ?? ""
            )
        );

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getWinnerInfo,
        enabled: isSuccessGetLotteryWinner,
    });

    useEffect(() => {
        getLotteryExpectation();
    }, [selectedWinnerId]);
    useEffect(() => {
        if (expectation && isSuccessGetLotteryExpectation) {
            setSelectedExpectations(expectation);
        }
    }, [expectation, isSuccessGetLotteryExpectation]);
    useEffect(() => {
        if (isSuccessGetLotteryExpectation) {
            showToast();
            refetchLotteryExpectation();
        }
    }, [isSuccessPatchLotteryExpectation]);

    const handleRefetch = () => {
        phoneNumberRef.current = phoneNumberInputRef.current?.value || "";
        refetchWinnerInfo();
    };

    const handleLottery = () => {
        navigate("/lottery/winner");
    };

    const handleClickExpectation = async (winnerId: number) => {
        handleOpenModal();
        setSelectedWinnerId(winnerId);
    };

    const handleClickDelete = (id: number) => {
        patchLotteryExpectation(id);
    };

    const expectations = selectedExpectations.map((winner) => [
        winner.createdDate,
        winner.createdTime,
        winner.expectation,
        <Button buttonSize="sm" onClick={() => handleClickDelete(winner.casperId)}>
            삭제
        </Button>,
    ]);

    const winnerList = useMemo(
        () =>
            winnerInfo.map((winner, idx) => [
                idx + 1,
                winner.id,
                winner.phoneNumber,
                winner.linkClickedCounts,
                <div className="flex justify-between">
                    <span>{winner.expectation}</span>
                    <span
                        className="cursor-pointer"
                        onClick={() => handleClickExpectation(winner.id)}
                    >
                        기대평 보기
                    </span>
                </div>,
                winner.appliedCount,
            ]),
        [winnerInfo]
    );

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="w-[1560px] flex flex-col items-center justify-center gap-8 mt-10">
                <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            alt="뒤로 가기 버튼"
                            src="/assets/icons/left-arrow.svg"
                            className="cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                        <p className="h-body-1-medium">당첨자 리스트</p>
                    </div>

                    <div className="flex gap-2">
                        <input
                            ref={phoneNumberInputRef}
                            className="border border-neutral-950 rounded-lg text-neutral-950 h-body-1-medium"
                        />
                        <Button buttonSize="sm" onClick={handleRefetch}>
                            검색
                        </Button>
                    </div>
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

            <ModalComponent>
                <Table headers={LOTTERY_EXPECTATIONS_HEADER} data={expectations} height="auto" />
            </ModalComponent>

            {ToastComponent}
        </div>
    );
}

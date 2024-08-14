import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import { COOKIE_KEY } from "@/constants/cookie";
import { LOTTERY_EXPECTATIONS_HEADER, LOTTERY_PARTICIPANT_HEADER } from "@/constants/lottery";
import useFetch from "@/hooks/useFetch";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { LotteryExpectationsType, LotteryParticipantType } from "@/types/lottery";
import { GetLotteryExpectationsResponse, GetLotteryParticipantResponse } from "@/types/lotteryApi";

export default function LotteryParticipantList() {
    const navigate = useNavigate();

    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const { showToast, ToastComponent } = useToast("수정 사항이 반영됐습니다!");
    const { handleOpenModal, ModalComponent } = useModal();

    const [selectedWinnerId, setSelectedWinnerId] = useState<number>(-1);
    const phoneNumberRef = useRef<string>("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);

    const {
        data: participantInfo,
        totalLength: participantLength,
        isSuccess: isSuccessGetParticipant,
        fetchNextPage: getParticipantInfo,
        refetch: refetchParticipantInfo,
    } = useInfiniteFetch<LotteryParticipantType, GetLotteryParticipantResponse>({
        fetch: (pageParam: number) =>
            LotteryAPI.getLotteryParticipant(
                {
                    size: 10,
                    page: pageParam,
                    phoneNumber: phoneNumberRef.current,
                },
                cookies[COOKIE_KEY.ACCESS_TOKEN]
            ),
        initialPageParam: 0,
        getNextPageParam: (currentPageParam: number, lastPage: GetLotteryParticipantResponse) => {
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
        startFetching: selectedWinnerId !== -1,
    });

    const { isSuccess: isSuccessPatchLotteryExpectation, fetchData: patchLotteryExpectation } =
        useFetch<{}, number>((casperId: number, token) =>
            LotteryAPI.patchLotteryExpectation(
                {
                    casperId,
                },
                token
            )
        );

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getParticipantInfo,
        enabled: isSuccessGetParticipant,
        root: tableContainerRef.current,
    });

    const expectationTableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef: expectationTargetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getLotteryExpectation,
        enabled: isSuccessGetLotteryExpectation,
        root: expectationTableContainerRef.current,
    });

    // console.log(expectationTableContainerRef.current, expectationTargetRef.current);
    // console.log(tableContainerRef.current, targetRef.current);

    useEffect(() => {
        refetchLotteryExpectation();
    }, [selectedWinnerId]);
    useEffect(() => {
        if (isSuccessGetLotteryExpectation) {
            showToast();
            refetchLotteryExpectation();
        }
    }, [isSuccessPatchLotteryExpectation]);

    const handleRefetch = () => {
        phoneNumberRef.current = phoneNumberInputRef.current?.value || "";
        refetchParticipantInfo();
    };

    const handleLotteryWinner = () => {
        navigate("/lottery/winner-list");
    };

    const handleClickExpectation = async (participantId: number) => {
        handleOpenModal();
        setSelectedWinnerId(participantId);
    };

    const handleClickDelete = (id: number) => {
        patchLotteryExpectation(id);
    };

    const expectations = useMemo(
        () =>
            expectation.map((participant) => [
                participant.createdDate,
                participant.createdTime,
                participant.expectation,
                <Button buttonSize="sm" onClick={() => handleClickDelete(participant.casperId)}>
                    삭제
                </Button>,
            ]),
        [expectation]
    );

    const participantList = useMemo(
        () =>
            participantInfo.map((participant) => [
                participant.id,
                participant.createdDate,
                participant.createdTime,
                participant.phoneNumber,
                participant.linkClickedCounts,
                <div className="flex justify-between">
                    <span>{participant.expectation}</span>
                    <span
                        className="cursor-pointer"
                        onClick={() => handleClickExpectation(participant.id)}
                    >
                        기대평 보기
                    </span>
                </div>,
                participant.appliedCount,
            ]),
        [participantInfo]
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
                        <p className="h-body-1-medium">
                            전체 참여자 리스트 {participantLength.toLocaleString("en-US")} 명
                        </p>
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
                    headers={LOTTERY_PARTICIPANT_HEADER}
                    data={participantList}
                    dataLastItem={targetRef}
                />

                <Button buttonSize="lg" onClick={handleLotteryWinner}>
                    당첨자 보러가기
                </Button>
            </div>

            <ModalComponent>
                <Table
                    ref={expectationTableContainerRef}
                    headers={LOTTERY_EXPECTATIONS_HEADER}
                    data={expectations}
                    dataLastItem={expectationTargetRef}
                />
            </ModalComponent>

            {ToastComponent}
        </div>
    );
}

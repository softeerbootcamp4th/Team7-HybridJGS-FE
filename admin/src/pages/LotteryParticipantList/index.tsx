import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LotteryAPI } from "@/apis/lotteryAPI";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import { LOTTERY_EXPECTATIONS_HEADER, LOTTERY_PARTICIPANT_HEADER } from "@/constants/lottery";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useModal from "@/hooks/useModal";
import { LotteryExpectationsType } from "@/types/lottery";
import { GetLotteryParticipantResponse } from "@/types/lotteryApi";

export default function LotteryParticipantList() {
    const navigate = useNavigate();

    const { handleOpenModal, ModalComponent } = useModal();
    const [selectedExpectation, setSelectedExpectation] = useState<LotteryExpectationsType[]>([]);
    const phoneNumberRef = useRef<string>("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);

    const {
        data: participantInfo,
        totalLength: participantLength,
        isSuccess: isSuccessGetParticipant,
        fetchNextPage: getParticipantInfo,
        refetch: refetchParticipantInfo,
    } = useInfiniteFetch({
        fetch: (pageParam: number) =>
            LotteryAPI.getLotteryParticipant({
                size: 10,
                page: pageParam,
                phoneNumber: phoneNumberRef.current,
            }),
        initialPageParam: 1,
        getNextPageParam: (currentPageParam: number, lastPage: GetLotteryParticipantResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getParticipantInfo,
        enabled: isSuccessGetParticipant,
    });

    const handleRefetch = () => {
        phoneNumberRef.current = phoneNumberInputRef.current?.value || "";
        refetchParticipantInfo();
    };

    const handleLotteryWinner = () => {
        navigate("/lottery/winner-list");
    };

    const handleClickExpectation = async (participantId: number) => {
        handleOpenModal();

        const data = await LotteryAPI.getLotteryExpectations({
            participantId: participantId,
        });
        setSelectedExpectation(data);
    };

    const expectations = selectedExpectation.map((participant) => [
        participant.casperId,
        participant.expectation,
    ]);

    const participantList = useMemo(
        () =>
            participantInfo.map((participant) => [
                participant.id,
                participant.createdAt,
                participant.createdAt,
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
                <Table headers={LOTTERY_EXPECTATIONS_HEADER} data={expectations} height="auto" />
            </ModalComponent>
        </div>
    );
}

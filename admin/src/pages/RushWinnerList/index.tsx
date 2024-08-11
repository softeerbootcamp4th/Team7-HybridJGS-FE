import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { GetRushParticipantListResponse, RushOptionType } from "@/types/rush";

export default function RushWinnerList() {
    const location = useLocation();
    const navigate = useNavigate();

    const rushId = location.state.id;

    const [isWinnerToggle, setIsWinnerToggle] = useState<boolean>(false);
    const [options, setOptions] = useState<RushOptionType[]>([]);
    const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);

    const {
        data: participants,
        isSuccess: isSuccessGetRushParticipantList,
        fetchNextPage: getRushParticipantList,
        refetch: refetchRushParticipantList,
    } = useInfiniteFetch({
        fetch: (pageParam: number) =>
            RushAPI.getRushParticipantList({
                id: rushId,
                size: 10,
                page: pageParam,
                option: options[selectedOptionIdx].rushOptionId,
            }),
        initialPageParam: 1,
        getNextPageParam: (currentPageParam: number, lastPage: GetRushParticipantListResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
        startFetching: options.length !== 0,
    });
    const {
        data: winners,
        isSuccess: isSuccessGetRushWinnerList,
        fetchNextPage: getRushWinnerList,
    } = useInfiniteFetch({
        fetch: (pageParam: number) =>
            RushAPI.getRushWinnerList({
                id: rushId,
                size: 10,
                page: pageParam,
            }),
        initialPageParam: 1,
        getNextPageParam: (currentPageParam: number, lastPage: GetRushParticipantListResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });

    const currentData = isWinnerToggle ? winners : participants;

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: isWinnerToggle ? getRushWinnerList : getRushParticipantList,
        enabled: isSuccessGetRushParticipantList && isSuccessGetRushWinnerList,
    });

    useEffect(() => {
        handleGetOptions();
    }, []);

    useEffect(() => {
        return () => handleTableScrollTop();
    }, [isWinnerToggle]);
    useEffect(() => {
        refetchRushParticipantList();
    }, [selectedOptionIdx]);

    const handleTableScrollTop = () => {
        if (tableContainerRef.current) {
            const table = tableContainerRef.current.querySelector(".table-contents");
            table?.scrollTo({ top: 0 });
        }
    };

    const handleGetOptions = async () => {
        const data = await RushAPI.getRushOptions({ id: rushId });
        setOptions(data);
        setSelectedOptionIdx(0);
    };

    const handleClickOption = (idx: number) => {
        handleTableScrollTop();
        setSelectedOptionIdx(() => idx);
    };

    const optionTitleList = useMemo(
        () => options.map((option) => `옵션 ${option.rushOptionId} : ${option.mainText}`),
        [options]
    );
    const participantHeader = useMemo(
        () => [
            "ID",
            "전화번호",
            "등수",
            "클릭 시간",
            isWinnerToggle ? (
                "선택한 옵션"
            ) : (
                <Dropdown
                    options={optionTitleList}
                    selectedIdx={selectedOptionIdx}
                    handleClickOption={handleClickOption}
                />
            ),
        ],
        [optionTitleList, isWinnerToggle, selectedOptionIdx]
    );
    const dataList = useMemo(
        () =>
            currentData.map((participant) => {
                const selectedOptionIdx = participant.balanceGameChoice - 1;
                return [
                    participant.id,
                    participant.phoneNumber,
                    participant.rank,
                    participant.createdAt,
                    `옵션 ${selectedOptionIdx + 1} : ${options[selectedOptionIdx].mainText}`,
                ];
            }),
        [currentData, selectedOptionIdx]
    );

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="w-[1560px] flex flex-col mt-10 gap-4">
                <div className="flex items-center gap-4">
                    <img
                        alt="뒤로 가기 버튼"
                        src="/assets/icons/left-arrow.svg"
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <p className="h-body-1-medium">선착순 참여자 리스트 {currentData.length} 명</p>
                    <Button
                        buttonSize="sm"
                        onClick={() => setIsWinnerToggle((prevToggle) => !prevToggle)}
                    >
                        당첨자 수만 보기 {isWinnerToggle ? "OFF" : "ON"}
                    </Button>
                </div>

                <Table
                    headers={participantHeader}
                    ref={tableContainerRef}
                    data={dataList}
                    dataLastItem={targetRef}
                />
            </div>
        </div>
    );
}

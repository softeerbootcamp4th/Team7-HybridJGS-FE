import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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

    const rushId = location.state.id;

    const [isWinnerToggle, setIsWinnerToggle] = useState<boolean>(false);
    const [options, setOptions] = useState<RushOptionType[]>([]);
    const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);

    const optionTitleList = options.map((option, idx) => `옵션 ${idx + 1} : ${option.mainText}`);

    const {
        data: participants,
        isSuccess: isSuccessGetRushParticipantList,
        fetchNextPage: getRushParticipantList,
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

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: getRushParticipantList,
        enabled: isSuccessGetRushParticipantList,
    });

    const APPLICANT_LIST_HEADER = [
        "ID",
        "전화번호",
        "등수",
        "클릭 시간",
        <Dropdown
            options={optionTitleList}
            selectedIdx={selectedOptionIdx}
            handleClickOption={(idx) => setSelectedOptionIdx(idx)}
        />,
    ];

    const data = participants.map((participant, idx) => {
        const selectedOptionIdx = participant.balanceGameChoice - 1;
        return [
            idx + 1,
            participant.phoneNumber,
            idx + 1,
            participant.createdAt,
            `옵션 ${selectedOptionIdx + 1} : ${options[selectedOptionIdx].mainText}`,
        ];
    });

    useEffect(() => {
        handleGetOptions();
        getRushParticipantList();
    }, []);

    const handleGetOptions = async () => {
        const data = await RushAPI.getRushOptions({ id: rushId });
        setOptions(data);
        setSelectedOptionIdx(0);
    };

    return (
        <div>
            <TabHeader />

            <div className="w-[1560px] flex flex-col mt-10 gap-4">
                <div className="flex items-center gap-4">
                    <p className="h-body-1-medium">선착순 참여자 리스트 {participants.length} 명</p>
                    <Button
                        buttonSize="sm"
                        onClick={() => setIsWinnerToggle((prevToggle) => !prevToggle)}
                    >
                        당첨자 수만 보기 {isWinnerToggle ? "OFF" : "ON"}
                    </Button>
                </div>

                <Table
                    headers={APPLICANT_LIST_HEADER}
                    ref={tableContainerRef}
                    data={data}
                    dataLastItem={targetRef}
                />
            </div>
        </div>
    );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import { COOKIE_KEY } from "@/constants/cookie";
import useFetch from "@/hooks/useFetch";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { RushOptionType, RushParticipantType } from "@/types/rush";
import {
    GetRushOptionsResponse,
    GetRushParticipantListResponse,
    GetRushWinnerListResponse,
} from "@/types/rushApi";
import { sortRushOptions } from "@/utils/rush/sortRushOptions";

export default function RushWinnerList() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const rushId = location.state.id;

    const [isWinnerToggle, setIsWinnerToggle] = useState<boolean>(false);
    const [options, setOptions] = useState<RushOptionType[]>([]);
    const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);

    const phoneNumberRef = useRef<string>("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);

    const {
        data: participants,
        totalLength: participantsLength,
        isSuccess: isSuccessGetRushParticipantList,
        fetchNextPage: getRushParticipantList,
        refetch: refetchRushParticipantList,
    } = useInfiniteFetch<RushParticipantType, GetRushParticipantListResponse>({
        fetch: (pageParam: number) =>
            RushAPI.getRushParticipantList(
                {
                    id: rushId,
                    size: 10,
                    page: pageParam,
                    option: selectedOptionIdx + 1,
                    phoneNumber: phoneNumberRef.current,
                },
                cookies[COOKIE_KEY.ACCESS_TOKEN]
            ),
        initialPageParam: 0,
        getNextPageParam: (currentPageParam: number, lastPage: GetRushParticipantListResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
        startFetching: options.length !== 0,
    });
    const {
        data: winners,
        totalLength: winnersLength,
        isSuccess: isSuccessGetRushWinnerList,
        fetchNextPage: getRushWinnerList,
        refetch: refetchRushWinnerList,
    } = useInfiniteFetch<RushParticipantType, GetRushWinnerListResponse>({
        fetch: (pageParam: number) =>
            RushAPI.getRushWinnerList(
                {
                    id: rushId,
                    size: 10,
                    page: pageParam,
                    phoneNumber: phoneNumberRef.current,
                },
                cookies[COOKIE_KEY.ACCESS_TOKEN]
            ),
        initialPageParam: 0,
        getNextPageParam: (currentPageParam: number, lastPage: GetRushParticipantListResponse) => {
            return lastPage.isLastPage ? undefined : currentPageParam + 1;
        },
    });

    const {
        data: rushOptions,
        isSuccess: isSuccessGetRushOptions,
        fetchData: getRushOptions,
    } = useFetch<GetRushOptionsResponse>((_, token) =>
        RushAPI.getRushOptions({ id: rushId }, token)
    );

    const currentData = isWinnerToggle ? winners : participants;

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const { targetRef } = useIntersectionObserver<HTMLTableRowElement>({
        onIntersect: isWinnerToggle ? getRushWinnerList : getRushParticipantList,
        enabled: isSuccessGetRushParticipantList && isSuccessGetRushWinnerList,
        root: tableContainerRef,
    });

    useEffect(() => {
        getRushOptions();
    }, []);

    useEffect(() => {
        if (isSuccessGetRushOptions && rushOptions) {
            const sortedRushOptions = rushOptions.options.sort(sortRushOptions);
            setOptions(sortedRushOptions);
            setSelectedOptionIdx(0);
        }
    }, [isSuccessGetRushOptions, rushOptions]);
    useEffect(() => {
        return () => handleTableScrollTop();
    }, [isWinnerToggle]);
    useEffect(() => {
        refetchRushParticipantList();
    }, [selectedOptionIdx]);

    const handleSearchPhoneNumber = () => {
        phoneNumberRef.current = phoneNumberInputRef.current?.value || "";

        if (isWinnerToggle) {
            refetchRushWinnerList();
        } else {
            refetchRushParticipantList();
        }
    };

    const handleTableScrollTop = () => {
        if (tableContainerRef.current) {
            const table = tableContainerRef.current.querySelector(".table-contents");
            table?.scrollTo({ top: 0 });
        }
    };

    const handleClickOption = (idx: number) => {
        handleTableScrollTop();
        setSelectedOptionIdx(() => idx);
    };

    const optionTitleList = useMemo(
        () =>
            options
                .sort(sortRushOptions)
                .map((option, idx) => `옵션 ${idx + 1} : ${option.mainText}`),
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
                return [
                    participant.id,
                    participant.phoneNumber,
                    participant.rank,
                    participant.createdTime,
                    `옵션 ${selectedOptionIdx + 1} : ${options[selectedOptionIdx].mainText}`,
                ];
            }),
        [currentData, selectedOptionIdx]
    );

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="w-[1560px] flex flex-col mt-10 gap-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            alt="뒤로 가기 버튼"
                            src="/assets/icons/left-arrow.svg"
                            className="cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                        <p className="h-body-1-medium">
                            선착순 참여자 리스트{" "}
                            {(isWinnerToggle ? winnersLength : participantsLength).toLocaleString(
                                "en-US"
                            )}{" "}
                            명
                        </p>
                        <Button
                            buttonSize="sm"
                            onClick={() => setIsWinnerToggle((prevToggle) => !prevToggle)}
                        >
                            당첨자 수만 보기 {isWinnerToggle ? "OFF" : "ON"}
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <input
                            ref={phoneNumberInputRef}
                            className="border border-neutral-950 rounded-lg text-neutral-950 h-body-1-medium"
                        />
                        <Button buttonSize="sm" onClick={handleSearchPhoneNumber}>
                            검색
                        </Button>
                    </div>
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

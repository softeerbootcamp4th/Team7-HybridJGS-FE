import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Table from "@/components/Table";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import { RushApplicantType, RushSelectionType } from "@/types/rush";

interface ApplicantListProps {
    navigatePrevSection: () => void;
    selectedIdx: number | null;
}

export default function ApplicantList({ navigatePrevSection, selectedIdx }: ApplicantListProps) {
    const { rushList } = useRushEventStateContext();

    const [selectionList, setSelectionList] = useState<RushSelectionType[]>([]);
    const [applicantList, setApplicantList] = useState<RushApplicantType[]>([]);
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const selectionTitleList = selectionList.map(
        (selection, idx) => `옵션 ${idx + 1} : ${selection.main_text}`
    );

    const APPLICANT_LIST_HEADER = [
        "ID",
        "전화번호",
        "등수",
        "클릭 시간",
        <Dropdown
            options={selectionTitleList}
            selectedIdx={selectedOption}
            handleClickOption={(idx) => setSelectedOption(idx)}
        />,
    ];

    useEffect(() => {
        // TODO: 데이터 패칭 로직 구현 필요
        setApplicantList([
            {
                phone_number: "010-1111-2222",
                balance_game_choice: "1",
                created_at: "2024-07-25 20:00 123",
            },
            {
                phone_number: "010-1111-2222",
                balance_game_choice: "1",
                created_at: "2024-07-25 20:00 125",
            },
            {
                phone_number: "010-1111-2222",
                balance_game_choice: "1",
                created_at: "2024-07-25 20:00 127",
            },
        ]);
        setSelectionList([
            {
                rush_option_id: "1",
                main_text: "첫 차로 저렴한 차 사기",
                sub_text: " 첫 차는 가성비가 짱이지!",
                result_main_text: "누구보다 가성비 갑인 캐스퍼 일렉트릭",
                result_sub_text: "전기차 평균보다 훨씬 저렴한 캐스퍼 일렉트릭!",
                image_url: "left_image.png",
            },
            {
                rush_option_id: "2",
                main_text: "첫 차로 성능 좋은 차 사기",
                sub_text: " 차는 당연히 성능이지!",
                result_main_text: "필요한 건 다 갖춘 캐스퍼 일렉트릭",
                result_sub_text: "전기차 평균보다 훨씨니 저렴한 캐스퍼 일렉트릭!",
                image_url: "left_image.png",
            },
        ]);
    }, []);

    if (selectedIdx === null) {
        return <></>;
    }

    const selectedRushItem = rushList[selectedIdx];
    const data = applicantList.map((applicant, idx) => {
        const selectedOptionIdx = parseInt(applicant.balance_game_choice) - 1;
        return [
            idx + 1,
            applicant.phone_number,
            idx + 1,
            applicant.created_at,
            `옵션 ${selectedOptionIdx + 1} : ${selectionList[selectedOptionIdx].main_text}`,
        ];
    });

    return (
        <div className="w-[1560px] flex flex-col mt-10 gap-4">
            <div className="flex items-center gap-4">
                <img
                    alt="뒤로 가기 버튼"
                    src="/assets/icons/left-arrow.svg"
                    className="cursor-pointer"
                    onClick={navigatePrevSection}
                />
                <p className="h-body-1-medium">
                    {selectedRushItem.event_date} 선착순 참여자 리스트 {applicantList.length} 명
                </p>
                <Button buttonSize="sm">당첨자 수만 보기 ON</Button>
            </div>

            <Table headers={APPLICANT_LIST_HEADER} data={data} />
        </div>
    );
}

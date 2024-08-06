import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";

const LOTTERY_WINNER_HEADER = [
    "등수",
    "ID",
    "생성 시간",
    "전화번호",
    "공유 링크 클릭 횟수",
    "기대평 작성 여부",
    "총 응모 횟수",
];
const data = [
    {
        phone_number: "010-1111-2222",
        link_clicked_counts: "1",
        expectation: "1",
    },
    {
        phone_number: "010-1111-2223",
        link_clicked_counts: "3",
        expectation: "1",
    },
    {
        phone_number: "010-1111-2224",
        link_clicked_counts: "4",
        expectation: "0",
    },
];

export default function LotteryWinner() {
    const navigate = useNavigate();

    const [winnerList, setWinnerList] = useState([] as any);

    useEffect(() => {
        setWinnerList(
            data.map((d, idx) => {
                return [
                    idx + 1,
                    d.phone_number,
                    d.phone_number,
                    d.phone_number,
                    d.link_clicked_counts,
                    d.link_clicked_counts,
                    d.link_clicked_counts,
                ];
            })
        );
    }, []);

    const handleLottery = () => {
        // TODO: 다시 추첨하는 로직 구현
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

                <Table headers={LOTTERY_WINNER_HEADER} data={winnerList} />

                <Button buttonSize="lg" onClick={handleLottery}>
                    당첨자 다시 추첨하기
                </Button>
            </div>
        </div>
    );
}

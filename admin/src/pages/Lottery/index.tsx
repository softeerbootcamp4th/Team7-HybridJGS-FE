import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import TabHeader from "@/components/TabHeader";

export default function Lottery() {
    const navigate = useNavigate();

    const [giftCount, setGiftCount] = useState<number>(0);

    useEffect(() => {
        // TODO: 추첨 이벤트 정보 불러오기
        setGiftCount(363);
    }, []);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value);
        setGiftCount(count || 0);
    };

    const handleLottery = () => {
        // TODO: 당첨자 추첨
        navigate("/lottery/winner");
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <TabHeader />

            <div className="flex flex-col h-full items-center justify-center gap-8 pb-40">
                <div className="flex border">
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">전체 참여자 수</p>
                    <p className="px-6 py-4 w-[200px] h-body-1-regular">1000</p>
                    <p className="px-6 py-4 w-[200px] bg-gray-50 h-body-1-bold">당첨자 수</p>
                    <div className="self-center px-4">
                        <input value={giftCount} onChange={handleChangeInput} />
                    </div>
                </div>

                <Button buttonSize="lg" onClick={handleLottery}>
                    당첨자 추첨하기
                </Button>
            </div>
        </div>
    );
}

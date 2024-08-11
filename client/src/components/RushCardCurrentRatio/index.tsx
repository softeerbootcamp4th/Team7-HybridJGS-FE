import { useEffect, useState } from "react";
import Category from "@/components/Category";
import Tooltip from "@/components/Tooltip";
import Reload from "/public/assets/icons/reload.svg?react";

const TOOLTIP_CONTENT = () => (
    <>
        새로고침을 눌러
        <br />
        실시간으로 바뀌는 결과를 지켜보세요
    </>
);

function ReloadButton() {
    return (
        <button
            // TODO: 새로고침 시 실시간 구현 (getRushBalance, /event/rush/balance)
            onClick={() => {
                console.log("새로고침");
            }}
        >
            <Reload />
        </button>
    );
}

export default function RushCardCurrentRatio() {
    const [showToggle, setShowToggle] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToggle(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex flex-col gap-16 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
            <span className="flex flex-col justify-center items-center gap-3">
                <p className="h-body-2-regular text-n-neutral-500">실시간 투표 결과</p>
                <p className="h-heading-2-bold text-n-neutral-950">
                    이대로 가면 우리 편이 질 수도 있어요!
                </p>
            </span>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <p className="h-heading-4-bold text-n-neutral-950">첫 차로 성능 좋은 차</p>
                        <Category type="limited">우세해요!</Category>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="h-heading-4-bold text-n-neutral-950">첫 차로 저렴한 차</p>
                        <Category type="basic">당신의 선택</Category>
                    </div>
                </div>
                <div className="h-heading-3-bold h-[66px] flex justify-between">
                    <p className="bg-gradient-green flex items-center">65%</p>
                    <p className="bg-gradient-red flex items-center">35%</p>
                </div>
            </div>
            <div className="absolute right-6 bottom-6">
                {showToggle ? (
                    <Tooltip content={TOOLTIP_CONTENT()} tooltipPosition="left">
                        <ReloadButton />
                    </Tooltip>
                ) : (
                    <ReloadButton />
                )}
            </div>
        </div>
    );
}

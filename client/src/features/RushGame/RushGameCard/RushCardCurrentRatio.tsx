import Category from "@/components/Category";
import Tooltip from "@/components/Tooltip";
import { CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import useToggleContents from "@/hooks/useToggleContents.ts";
import Reload from "/public/assets/icons/reload.svg?react";

const TOOLTIP_CONTENT = () => (
    <>
        새로고침을 눌러
        <br />
        실시간으로 바뀌는 결과를 지켜보세요
    </>
);

const MESSAGES = {
    WINNING: "이대로 가면 우리 편이 이겨요!",
    LOSING: "이대로 가면 우리 편이 질 수도 있어요!",
};

function ReloadButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick}>
            <Reload />
        </button>
    );
}

export default function RushCardCurrentRatio() {
    const { gameState, getOptionRatio, fetchRushBalance } = useRushGameContext();
    const { toggleContents } = useToggleContents(true, 5000);

    const leftOptionRatio = getOptionRatio(CARD_TYPE.LEFT_OPTIONS);
    const rightOptionRatio = getOptionRatio(CARD_TYPE.RIGHT_OPTIONS);

    const message = leftOptionRatio > rightOptionRatio ? MESSAGES.WINNING : MESSAGES.LOSING;

    return (
        <div className="relative flex flex-col gap-16 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
            <span className="flex flex-col justify-center items-center gap-3">
                <p className="h-body-2-regular text-n-neutral-500">실시간 투표 결과</p>
                <p className="h-heading-2-bold text-n-neutral-950">{message}</p>
            </span>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    {/* TODO: 공통 로직 함수로 분리 */}
                    <div className="flex gap-2 items-center">
                        <p className="h-heading-4-bold text-n-neutral-950">첫 차로 성능 좋은 차</p>
                        {leftOptionRatio > rightOptionRatio && (
                            <Category type="limited">우세해요!</Category>
                        )}
                        {gameState.userSelectedOption === CARD_TYPE.LEFT_OPTIONS && (
                            <Category type="basic">당신의 선택</Category>
                        )}
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="h-heading-4-bold text-n-neutral-950">첫 차로 저렴한 차</p>
                        {rightOptionRatio > leftOptionRatio && (
                            <Category type="limited">우세해요!</Category>
                        )}
                        {gameState.userSelectedOption === CARD_TYPE.RIGHT_OPTIONS && (
                            <Category type="basic">당신의 선택</Category>
                        )}
                    </div>
                </div>
                {/* TODO: 비율대로 프로그래스바 움직이는 로직 구현 */}
                <div className="h-heading-3-bold h-[66px] flex justify-between">
                    <p className="bg-gradient-green flex items-center w-1/2">{leftOptionRatio}%</p>
                    <p className="bg-gradient-red flex items-center w-1/2">{rightOptionRatio}%</p>
                </div>
            </div>
            <div className="absolute right-6 bottom-6">
                {toggleContents ? (
                    <Tooltip content={TOOLTIP_CONTENT()} tooltipPosition="left">
                        <ReloadButton onClick={fetchRushBalance} />
                    </Tooltip>
                ) : (
                    <ReloadButton onClick={fetchRushBalance} />
                )}
            </div>
        </div>
    );
}

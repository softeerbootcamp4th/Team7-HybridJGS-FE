import Category from "@/components/Category";
import Tooltip from "@/components/Tooltip";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import RushProgressBar from "@/features/RushGame/RushGameComponents/RushProgressBar.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import useToggleContents from "@/hooks/useToggleContents.ts";
import { CardOption } from "@/types/rushGame.ts";
import Reload from "/public/assets/icons/reload.svg?react";

interface OptionDisplayProps {
    mainText: string;
    userSelectedOptionRatio: number;
    oppositeOptionRatio: number;
    isUserSelected: boolean;
}

const TOOLTIP_CONTENT = () => (
    <>
        새로고침을 눌러
        <br />
        실시간으로 바뀌는 결과를 지켜보세요
    </>
);

const MESSAGES = {
    WINNING: "이대로 가면 우리 편이 이겨요!",
    TIED: "막상막하! 우리 편에 투표할 친구를 데려오세요!",
    LOSING: "이대로 가면 우리 편이 질 수도 있어요!",
};

function getMessage(leftRatio: number, rightRatio: number, userSelectedOption: CardOption) {
    if (leftRatio >= 49 && leftRatio <= 51 && rightRatio >= 49 && rightRatio <= 51) {
        return MESSAGES.TIED;
    }

    const userSelectedRatio =
        userSelectedOption === CARD_OPTION.LEFT_OPTIONS ? leftRatio : rightRatio;
    const oppositeRatio = userSelectedOption === CARD_OPTION.LEFT_OPTIONS ? rightRatio : leftRatio;

    if (userSelectedRatio > oppositeRatio) {
        return MESSAGES.WINNING;
    } else {
        return MESSAGES.LOSING;
    }
}

function ReloadButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick}>
            <Reload />
        </button>
    );
}

function OptionDisplay({
    mainText,
    userSelectedOptionRatio,
    oppositeOptionRatio,
    isUserSelected,
}: OptionDisplayProps) {
    return (
        <div className="flex gap-2 items-center">
            <p className="h-heading-4-bold text-n-neutral-950">{mainText}</p>
            {userSelectedOptionRatio > oppositeOptionRatio && (
                <Category type="limited">우세해요!</Category>
            )}
            {isUserSelected && <Category type="selected">당신의 선택</Category>}
        </div>
    );
}

export default function RushCardCurrentRatio() {
    const { gameState, getOptionRatio, fetchRushBalance, getSelectedCardInfo } =
        useRushGameContext();
    const { toggleContents } = useToggleContents(true, 5000);

    const leftOptionRatio = getOptionRatio(CARD_OPTION.LEFT_OPTIONS);
    const rightOptionRatio = getOptionRatio(CARD_OPTION.RIGHT_OPTIONS);

    const message = getMessage(leftOptionRatio, rightOptionRatio, gameState.userSelectedOption);

    const { mainText: leftMainText } = getSelectedCardInfo(CARD_OPTION.LEFT_OPTIONS);
    const { mainText: rightMainText } = getSelectedCardInfo(CARD_OPTION.RIGHT_OPTIONS);

    return (
        <div className="relative flex flex-col gap-16 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
            <span className="flex flex-col justify-center items-center text-center gap-3">
                <p className="h-body-2-regular text-n-neutral-500">실시간 투표 결과</p>
                <p className="h-heading-2-bold text-n-neutral-950">{message}</p>
            </span>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <OptionDisplay
                        mainText={leftMainText}
                        userSelectedOptionRatio={leftOptionRatio}
                        oppositeOptionRatio={rightOptionRatio}
                        isUserSelected={gameState.userSelectedOption === CARD_OPTION.LEFT_OPTIONS}
                    />
                    <OptionDisplay
                        mainText={rightMainText}
                        userSelectedOptionRatio={rightOptionRatio}
                        oppositeOptionRatio={leftOptionRatio}
                        isUserSelected={gameState.userSelectedOption === CARD_OPTION.RIGHT_OPTIONS}
                    />
                </div>
                <RushProgressBar
                    leftOptionRatio={leftOptionRatio}
                    rightOptionRatio={rightOptionRatio}
                />
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

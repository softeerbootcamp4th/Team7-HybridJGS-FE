import { cva } from "class-variance-authority";
import Tooltip from "@/components/Tooltip";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import RushCurrentOptionDisplay from "@/features/RushGame/RushGameComponents/RushCurrentOptionDisplay.tsx";
import RushProgressBar from "@/features/RushGame/RushGameComponents/RushProgressBar.tsx";
import useRushGameStateContext from "@/hooks/Contexts/useRushGameStateContext.ts";
import useFetchRushBalance from "@/hooks/RushGame/useFetchRushBalance.ts";
import useToggleContents from "@/hooks/useToggleContents.ts";
import { CardOption } from "@/types/rushGame.ts";
import { getOptionRatio } from "@/utils/RushGame/getOptionRatio.ts";
import { getSelectedCardInfo } from "@/utils/RushGame/getSelectedCardInfo.ts";
import Reload from "/public/assets/icons/reload.svg?react";

const tooltipVariants = cva(`absolute transition-opacity duration-300 ease-in-out`, {
    variants: {
        visible: {
            true: "opacity-1 visibility-visible",
            false: "opacity-0 visibility-hidden",
        },
    },
    defaultVariants: {
        visible: true,
    },
});

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

export default function RushCardCurrentRatio() {
    const { userSelectedOption, cardOptions } = useRushGameStateContext();
    const { toggleContents } = useToggleContents();
    const fetchRushBalance = useFetchRushBalance();

    const leftOptionRatio = getOptionRatio({
        cardOptions: cardOptions,
        option: CARD_OPTION.LEFT_OPTIONS,
    });
    const rightOptionRatio = getOptionRatio({
        cardOptions: cardOptions,
        option: CARD_OPTION.RIGHT_OPTIONS,
    });

    const message = getMessage(leftOptionRatio, rightOptionRatio, userSelectedOption);

    const { mainText: leftMainText } = getSelectedCardInfo({
        cardOptions: cardOptions,
        option: CARD_OPTION.LEFT_OPTIONS,
    });
    const { mainText: rightMainText } = getSelectedCardInfo({
        cardOptions: cardOptions,
        option: CARD_OPTION.RIGHT_OPTIONS,
    });

    return (
        <div className="relative flex flex-col gap-16 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
            <span className="flex flex-col justify-center items-center text-center gap-3">
                <p className="h-body-2-regular text-n-neutral-500">실시간 투표 결과</p>
                <p className="h-heading-2-bold text-n-neutral-950">{message}</p>
            </span>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <RushCurrentOptionDisplay
                        mainText={leftMainText}
                        userSelectedOptionRatio={leftOptionRatio}
                        oppositeOptionRatio={rightOptionRatio}
                        isUserSelected={userSelectedOption === CARD_OPTION.LEFT_OPTIONS}
                    />
                    <RushCurrentOptionDisplay
                        mainText={rightMainText}
                        userSelectedOptionRatio={rightOptionRatio}
                        oppositeOptionRatio={leftOptionRatio}
                        isUserSelected={userSelectedOption === CARD_OPTION.RIGHT_OPTIONS}
                    />
                </div>
                <RushProgressBar
                    leftOptionRatio={leftOptionRatio}
                    rightOptionRatio={rightOptionRatio}
                />
            </div>
            <div className="absolute right-6 bottom-6">
                <div className={tooltipVariants({ visible: toggleContents })}>
                    <Tooltip content={TOOLTIP_CONTENT()} tooltipPosition="left" />
                </div>
                <button onClick={fetchRushBalance}>
                    <Reload />
                </button>
            </div>
        </div>
    );
}

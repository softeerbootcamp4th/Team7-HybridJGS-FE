import { motion } from "framer-motion";
import Category from "@/components/Category";
import { CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { CardOption } from "@/types/rushGame.ts";

const MESSAGES = {
    WINNING: "축하해요! 선착순 경품 당첨이에요.",
    TIED: "황금 밸런스! 완벽한 동점이에요.",
    LOSING: "이런, 다음 기회를 다시 노려봐요.",
};

function getMessage(leftRatio: number, rightRatio: number, userSelectedOption: CardOption) {
    const userSelectedRatio =
        userSelectedOption === CARD_TYPE.LEFT_OPTIONS ? leftRatio : rightRatio;
    const oppositeRatio = userSelectedOption === CARD_TYPE.LEFT_OPTIONS ? rightRatio : leftRatio;

    if (userSelectedRatio > oppositeRatio) return MESSAGES.WINNING;
    if (userSelectedRatio < oppositeRatio) return MESSAGES.LOSING;
    return MESSAGES.TIED;
}

type WinStatus = "Win" | "Lose" | "Tie";

function getWinStatus(ratio: number, oppositeRatio: number): WinStatus {
    if (ratio === oppositeRatio) return "Tie";
    return ratio > oppositeRatio ? "Win" : "Lose";
}

function OptionDisplay({ mainText, winStatus }: { mainText: string; winStatus: WinStatus }) {
    const categoryType = winStatus === "Win" ? "limited" : "basic";
    return (
        <div className="flex gap-2 items-center">
            <p className="h-heading-4-bold text-n-neutral-950">{mainText}</p>
            <Category type={categoryType}>{winStatus}</Category>
        </div>
    );
}

export default function FinalResult() {
    const { gameState, getOptionRatio, getSelectedCardInfo } = useRushGameContext();

    const leftOptionRatio = getOptionRatio(CARD_TYPE.LEFT_OPTIONS);
    const rightOptionRatio = getOptionRatio(CARD_TYPE.RIGHT_OPTIONS);

    const message = getMessage(leftOptionRatio, rightOptionRatio, gameState.userSelectedOption);

    const { mainText: leftMainText } = getSelectedCardInfo(CARD_TYPE.LEFT_OPTIONS);
    const { mainText: rightMainText } = getSelectedCardInfo(CARD_TYPE.RIGHT_OPTIONS);

    const leftWinStatus = getWinStatus(leftOptionRatio, rightOptionRatio);
    const rightWinStatus = getWinStatus(rightOptionRatio, leftOptionRatio);

    return (
        <>
            <motion.p className="h-heading-2-bold pt-10" {...SCROLL_MOTION(ASCEND)}>
                {message}
            </motion.p>
            <motion.span
                className="h-body-1-regular text-n-black flex flex-col justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p>*이 화면은 밤 12시 이후 재접속이 불가능합니다.</p>
                <p>입력하신 전화번호로 경품 수령 관련 메시지가 전송될 예정이에요.</p>
            </motion.span>
            <div className="flex flex-col gap-12 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
                <span className="flex flex-col justify-center items-center text-center gap-3 text-n-black">
                    <p className="h-heading-4-bold">나의 선착순 등수</p>
                    <span className="flex gap-3 justify-center items-center ">
                        <p className="h-heading-1-bold">301등</p>
                        <p className="h-body-1-regular text-n-neutral-500">/ 13,524명 중</p>
                    </span>
                </span>
                <div className="flex flex-col gap-3">
                    <p className="h-body-2-regular text-n-neutral-500">최종 밸런스 게임 결과</p>
                    <div className="flex justify-between">
                        <OptionDisplay mainText={leftMainText} winStatus={leftWinStatus} />
                        <OptionDisplay mainText={rightMainText} winStatus={rightWinStatus} />
                    </div>
                    {/* TODO: 비율대로 프로그래스바 움직이는 로직 구현 */}
                    <div className="h-heading-3-bold h-[66px] flex justify-between">
                        <p className="bg-gradient-green flex items-center w-1/2">
                            {leftOptionRatio}%
                        </p>
                        <p className="bg-gradient-red flex items-center w-1/2">
                            {rightOptionRatio}%
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

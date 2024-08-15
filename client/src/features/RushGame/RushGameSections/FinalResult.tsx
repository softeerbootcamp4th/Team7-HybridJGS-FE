import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import Category from "@/components/Category";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import RushProgressBar from "@/features/RushGame/RushGameComponents/RushProgressBar.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushResultResponse } from "@/types/rushApi.ts";

const MESSAGES = {
    WINNING: "축하해요! 선착순 경품 당첨이에요.",
    LOSING: "아쉽네요, 다음 기회를 다시 노려봐요.",
};

type WinStatus = "Win" | "Lose" | "Tie";

function getWinStatus(ratio: number, oppositeRatio: number): WinStatus {
    if (ratio === oppositeRatio) return "Tie";
    return ratio > oppositeRatio ? "Win" : "Lose";
}

function OptionDisplay({
    mainText,
    winStatus,
    isUserSelected,
}: {
    mainText: string;
    winStatus: WinStatus;
    isUserSelected: boolean;
}) {
    const categoryType = winStatus === "Win" ? "limited" : "basic";
    return (
        <div className="flex gap-2 items-center">
            <p
                className={`h-heading-4-bold ${winStatus === "Win" ? "text-n-neutral-950" : "text-n-neutral-500"}`}
            >
                {mainText}
            </p>
            <Category type={categoryType}>{winStatus}</Category>
            {isUserSelected && <Category type="selected">당신의 선택</Category>}
        </div>
    );
}

export default function FinalResult() {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const [resultData, setResultData] = useState<GetRushResultResponse>();
    const { gameState, getOptionRatio, getSelectedCardInfo, updateCardOptions } =
        useRushGameContext();

    useEffect(() => {
        (async () => {
            const resultData = await RushAPI.getRushResult(cookies[COOKIE_TOKEN_KEY]);
            const { leftOption, rightOption } = resultData;
            setResultData(resultData);

            updateCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            updateCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        })();
    }, []);

    const isWinner = resultData?.isWinner || true;
    const rank = resultData?.rank || 0;
    const totalParticipants = resultData?.totalParticipants || 0;

    const message = isWinner ? MESSAGES.WINNING : MESSAGES.LOSING;

    const { mainText: leftMainText } = getSelectedCardInfo(CARD_OPTION.LEFT_OPTIONS);
    const { mainText: rightMainText } = getSelectedCardInfo(CARD_OPTION.RIGHT_OPTIONS);

    const leftOptionRatio = getOptionRatio(CARD_OPTION.LEFT_OPTIONS);
    const rightOptionRatio = getOptionRatio(CARD_OPTION.RIGHT_OPTIONS);

    const leftWinStatus = getWinStatus(leftOptionRatio, rightOptionRatio);
    const rightWinStatus = getWinStatus(rightOptionRatio, leftOptionRatio);

    return (
        <motion.div
            className="flex flex-col justify-center items-center gap-8"
            {...SCROLL_MOTION(ASCEND)}
        >
            <p className="h-heading-2-bold pt-10">{message}</p>
            <span className="h-body-1-regular text-n-black flex flex-col justify-center items-center">
                <p>*이 화면은 밤 12시 이후 재접속이 불가능합니다.</p>
                <p>입력하신 전화번호로 경품 수령 관련 메시지가 전송될 예정이에요.</p>
            </span>
            <div className="flex flex-col gap-12 w-[834px] h-[400px] bg-n-neutral-50 rounded-800 pt-12 pb-[94px] px-[57px] justify-between break-keep">
                <span className="flex flex-col justify-center items-center text-center gap-3 text-n-black">
                    <p className="h-heading-4-bold">나의 선착순 등수</p>
                    <span className="flex gap-3 justify-center items-center ">
                        <p className="h-heading-1-bold">{rank}등</p>
                        <p className="h-body-1-regular text-n-neutral-500">
                            / {totalParticipants.toLocaleString("en-US")}명 중
                        </p>
                    </span>
                </span>
                <div className="flex flex-col gap-3">
                    <p className="h-body-2-regular text-n-neutral-500">최종 밸런스 게임 결과</p>
                    <div className="flex justify-between">
                        <OptionDisplay
                            mainText={leftMainText}
                            winStatus={leftWinStatus}
                            isUserSelected={
                                gameState.userSelectedOption === CARD_OPTION.LEFT_OPTIONS
                            }
                        />
                        <OptionDisplay
                            mainText={rightMainText}
                            winStatus={rightWinStatus}
                            isUserSelected={
                                gameState.userSelectedOption === CARD_OPTION.RIGHT_OPTIONS
                            }
                        />
                    </div>
                    <RushProgressBar
                        leftOptionRatio={leftOptionRatio}
                        rightOptionRatio={rightOptionRatio}
                    />
                </div>
            </div>
        </motion.div>
    );
}

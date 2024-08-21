import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { CARD_OPTION, WIN_STATUS } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import RushProgressBar from "@/features/RushGame/RushGameComponents/RushProgressBar.tsx";
import RushResultOptionDisplay from "@/features/RushGame/RushGameComponents/RushResultOptionDisplay.tsx";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetRushResultResponse } from "@/types/rushApi.ts";
import { WinStatus } from "@/types/rushGame.ts";
import { getOptionRatio } from "@/utils/RushGame/getOptionRatio.ts";
import { getSelectedCardInfo } from "@/utils/RushGame/getSelectedCardInfo.ts";

const MESSAGES = {
    WINNING: "축하해요! 선착순 경품 당첨이에요.",
    LOSING: "아쉽네요, 다음 기회를 다시 노려봐요.",
};

function getWinStatus(ratio: number, oppositeRatio: number): WinStatus {
    if (ratio === oppositeRatio) return WIN_STATUS.TIE;
    return ratio > oppositeRatio ? WIN_STATUS.WIN : WIN_STATUS.LOSE;
}

interface FinalResultProps {
    unblockNavigation: () => void;
}

export default function FinalResult({ unblockNavigation }: FinalResultProps) {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { gameState, setCardOptions, setUserSelectedOption } = useRushGameContext();

    const {
        data: resultData,
        isSuccess: isSuccessRushResult,
        fetchData: getRushResult,
    } = useFetch<GetRushResultResponse>(
        () => RushAPI.getRushResult(cookies[COOKIE_KEY.ACCESS_TOKEN]),
        false
    );

    useEffect(() => {
        getRushResult();
        unblockNavigation();
    }, []);

    useEffect(() => {
        if (resultData && isSuccessRushResult) {
            const { optionId, leftOption, rightOption } = resultData;

            if (optionId) setUserSelectedOption(optionId);

            setCardOptions(CARD_OPTION.LEFT_OPTIONS, {
                selectionCount: leftOption,
            });
            setCardOptions(CARD_OPTION.RIGHT_OPTIONS, {
                selectionCount: rightOption,
            });
        }
    }, [resultData, isSuccessRushResult, setCardOptions]);

    const userParticipatedStatus = gameState.userParticipatedStatus;

    const isWinner = resultData?.isWinner;
    const rank = resultData?.rank || 0;
    const totalParticipants = resultData?.totalParticipants || 0;

    const message = isWinner ? MESSAGES.WINNING : MESSAGES.LOSING;

    const { mainText: leftMainText } = getSelectedCardInfo({
        gameState: gameState,
        option: CARD_OPTION.LEFT_OPTIONS,
    });
    const { mainText: rightMainText } = getSelectedCardInfo({
        gameState: gameState,
        option: CARD_OPTION.RIGHT_OPTIONS,
    });

    const leftOptionRatio = getOptionRatio({
        gameState: gameState,
        option: CARD_OPTION.LEFT_OPTIONS,
    });
    const rightOptionRatio = getOptionRatio({
        gameState: gameState,
        option: CARD_OPTION.RIGHT_OPTIONS,
    });

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
                {userParticipatedStatus && (
                    <span className="flex flex-col justify-center items-center text-center gap-3 text-n-black">
                        <p className="h-heading-4-bold">나의 선착순 등수</p>
                        <span className="flex gap-3 justify-center items-center ">
                            <p className="h-heading-1-bold">{rank}등</p>
                            <p className="h-body-1-regular text-n-neutral-500">
                                / {totalParticipants.toLocaleString("en-US")}명 중
                            </p>
                        </span>
                    </span>
                )}
                <div className={`flex flex-col gap-3 ${!userParticipatedStatus && "pt-20"}`}>
                    <p className="h-body-2-regular text-n-neutral-500">최종 밸런스 게임 결과</p>
                    <div className="flex justify-between">
                        <RushResultOptionDisplay
                            mainText={leftMainText}
                            winStatus={leftWinStatus}
                            isUserSelected={
                                gameState.userSelectedOption === CARD_OPTION.LEFT_OPTIONS
                            }
                            userParticipatedStatus={userParticipatedStatus}
                        />
                        <RushResultOptionDisplay
                            mainText={rightMainText}
                            winStatus={rightWinStatus}
                            isUserSelected={
                                gameState.userSelectedOption === CARD_OPTION.RIGHT_OPTIONS
                            }
                            userParticipatedStatus={userParticipatedStatus}
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

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import CardOptions from "@/features/Rush/BalanceGame/BalanceGameSection/CardOptions.tsx";
import CountDown from "@/features/Rush/BalanceGame/BalanceGameSection/CountDown.tsx";
import FinalResult from "@/features/Rush/BalanceGame/BalanceGameSection/FinalResult.tsx";
import SelectedCard from "@/features/Rush/BalanceGame/BalanceGameSection/SelectedCard.tsx";
import { useBalanceGameContext } from "@/hooks/useBalanceGameContext.ts";
import useCountDown from "@/hooks/useCountDown.ts";
import { SectionKeyProps } from "@/types/sections.ts";

export function BalanceGame({ id }: SectionKeyProps) {
    // const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const { gameState, setGameState, updateUserParticipationStatus } = useBalanceGameContext();
    // const [initialCountdown, setInitialCountdown] = useState<number | null>(null);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const rushData = await RushAPI.getRush();
    //             const currentEvent = rushData.events.find(
    //                 (event) => event.rushEventId === rushData.todayEventId
    //             );
    //
    //             if (rushData.serverDateTime && currentEvent?.startDateTime) {
    //                 const serverTime = new Date(rushData.serverDateTime).getTime();
    //                 const startTime = new Date(currentEvent.startDateTime).getTime();
    //                 const countdown = Math.max(0, Math.floor((startTime - serverTime) / 1000));
    //                 setInitialCountdown(countdown);
    //             }
    //
    //             const userParticipated = await RushAPI.getRushUserParticipationStatus(
    //                 cookies[COOKIE_TOKEN_KEY]
    //             );
    //             updateUserParticipationStatus(userParticipated);
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     })();
    // }, []);

    // const countdown = useCountDown(initialCountdown || 0);
    const countdown = useCountDown(1);

    useEffect(() => {
        if (countdown < 0 && gameState.phase === "PRE_EVENT") {
            setGameState((prev) => ({ ...prev, phase: "EVENT_RUNNING" }));
        }
    }, [countdown, gameState.phase, setGameState]);

    const renderBalanceGameContent = () => {
        switch (gameState.phase) {
            case "PRE_EVENT":
                return <CountDown countdown={countdown} />;
            case "EVENT_RUNNING":
                if (!gameState.userParticipated) {
                    // return <CardOptions />;
                    return <SelectedCard />;
                } else {
                    return <SelectedCard />;
                }
            case "EVENT_ENDED":
                return <FinalResult />;
            default:
                return null;
        }
    };

    return (
        <section
            id={id}
            className="relative h-screen bg-n-white flex flex-col gap-8 justify-center items-center snap-start"
        >
            {renderBalanceGameContent()}
            <motion.div
                className="flex flex-col justify-center items-center gap-4 my-3"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-2-regular text-n-neutral-500">
                    우리 편에 투표할 친구를 불러오세요!
                </p>
                <CTAButton label="이벤트 링크 공유" />
            </motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="dark">
                    <p className="h-body-2-bold">스크롤</p>
                    <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
                </Scroll>
            </motion.div>
        </section>
    );
}

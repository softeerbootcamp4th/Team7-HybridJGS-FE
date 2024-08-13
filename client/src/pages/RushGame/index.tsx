import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI.ts";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import CardOptions from "@/features/RushGame/RushGameSection/CardOptions.tsx";
import Countdown from "@/features/RushGame/RushGameSection/Countdown.tsx";
import FinalResult from "@/features/RushGame/RushGameSection/FinalResult.tsx";
import SelectedCard from "@/features/RushGame/RushGameSection/SelectedCard.tsx";
import useCountdown from "@/hooks/useCountdown.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";

export default function RushGame() {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const { gameState, setGameState, setUserParticipationStatus } = useRushGameContext();
    const [initialPreCountdown, setInitialPreCountdown] = useState<number | null>(null);
    const [initialRunCountdown, setInitialRunCountdown] = useState<number | null>(null);

    // TODO: loader 사용으로 바꾸기
    // const data = useLoaderData() as GetTotalRushEventsResponse;

    useEffect(() => {
        (async () => {
            try {
                const rushData = await RushAPI.getRush();
                const currentEvent = rushData.events.find(
                    (event) => event.rushEventId === rushData.todayEventId
                );

                if (rushData.serverTime && currentEvent?.startDateTime) {
                    const serverTime = new Date(rushData.serverTime).getTime();
                    const startTime = new Date(currentEvent.startDateTime).getTime();
                    const endTime = new Date(currentEvent.endDateTime).getTime();

                    const preCountdown = Math.max(0, Math.floor((startTime - serverTime) / 1000));
                    const runCountdown = Math.max(0, Math.floor((endTime - serverTime) / 1000));

                    setInitialPreCountdown(preCountdown);
                    setInitialRunCountdown(runCountdown);
                }

                const userParticipatedStatus = await RushAPI.getRushUserParticipationStatus(
                    cookies[COOKIE_TOKEN_KEY]
                );
                setUserParticipationStatus(userParticipatedStatus);
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }, []);

    // const preCountdown = useCountdown(initialPreCountdown || 0);
    // const runCountdown = useCountdown(initialRunCountdown || 0);

    // TEST CODE
    const preCountdown = useCountdown(3 || 0);
    const runCountdown = useCountdown(3 || 0);

    useEffect(() => {
        if (preCountdown < 0 && gameState.phase === "PRE_EVENT") {
            setGameState((prev) => ({ ...prev, phase: "EVENT_RUNNING" }));
        }
    }, [preCountdown, gameState.phase, setGameState]);

    useEffect(() => {
        if (gameState.userParticipatedStatus) {
            setGameState((prev) => ({
                ...prev,
                phase: "EVENT_RUNNING",
            }));
        }
    }, [gameState.userParticipatedStatus, setGameState]);

    const renderRushGameContent = () => {
        switch (gameState.phase) {
            case "PRE_EVENT":
                return <Countdown countdown={preCountdown} />;
            case "EVENT_RUNNING":
                if (!gameState.userParticipatedStatus) {
                    return <CardOptions countdown={runCountdown} />;
                } else {
                    return <SelectedCard countdown={runCountdown} />;
                }
            case "EVENT_ENDED":
                return <FinalResult />;
            default:
                return null;
        }
    };

    return (
        <section className="h-screen bg-n-white flex flex-col gap-8 justify-center items-center">
            {renderRushGameContent()}
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

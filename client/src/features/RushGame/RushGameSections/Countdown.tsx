import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RushAPI } from "@/apis/rushAPI.ts";
import { Background } from "@/components/Background";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useCountdown from "@/hooks/useCountdown.ts";
import useFetch from "@/hooks/useFetch.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { formatTime } from "@/utils/formatTime.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

function CountdownTimer() {
    const [initialPreCountdown, setInitialPreCountdown] = useState<number | null>(null);
    const { gameState, setGamePhase } = useRushGameContext();

    const {
        data: rushData,
        isSuccess: isSuccessRush,
        fetchData: getRush,
    } = useFetch<GetTotalRushEventsResponse>(() => RushAPI.getRush());

    useEffect(() => {
        getRush();
    }, []);

    useEffect(() => {
        if (isSuccessRush && rushData) {
            const serverDate = new Date(rushData.serverTime).toISOString().split("T")[0];

            const currentEvent = rushData.events.find((event) => {
                const eventDate = new Date(event.startDateTime).toISOString().split("T")[0];
                return eventDate === serverDate && event.rushEventId === rushData.todayEventId;
            });

            if (currentEvent) {
                const serverTime = getMsTime(rushData.serverTime);
                const startDateTime = getMsTime(currentEvent.startDateTime);

                setInitialPreCountdown(
                    Math.max(0, Math.floor((startDateTime - serverTime) / 1000))
                );
            }
        }
    }, [isSuccessRush, rushData]);

    const preCountdown = useCountdown(initialPreCountdown || null);

    useEffect(() => {
        if (
            preCountdown !== null &&
            preCountdown <= 0 &&
            gameState.phase === CARD_PHASE.NOT_STARTED
        ) {
            setGamePhase(CARD_PHASE.IN_PROGRESS);
        }
    }, [preCountdown, gameState.phase, setGamePhase]);

    if (initialPreCountdown === null || preCountdown === null) {
        return <Background></Background>;
    }

    const hours = Math.floor(preCountdown / 3600);
    const minutes = Math.floor((preCountdown % 3600) / 60);
    const seconds = preCountdown % 60;

    return (
        <Background>
            <p className="h-body-1-regular text-n-neutral-500">
                밸런스 게임 주제 공개까지 남은 시간
            </p>
            <div className="flex items-end gap-6 font-['HyundaiSansTextOffice-Bold'] font-normal text-[100px] text-n-neutral-950">
                <TimeDisplay label="Hours" value={formatTime(hours)} />
                <p className="leading-[100px]">:</p>
                <TimeDisplay label="Minutes" value={formatTime(minutes)} />
                <p className="leading-[100px]">:</p>
                <TimeDisplay label="Seconds" value={formatTime(seconds)} />
            </div>
        </Background>
    );
}

function TimeDisplay({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
            <p className="h-body-2-regular text-n-neutral-500">{label}</p>
            <p className="leading-[100px]">{value}</p>
        </span>
    );
}

export default function Countdown() {
    return (
        <>
            <motion.p className="h-heading-2-bold pt-10" {...SCROLL_MOTION(ASCEND)}>
                이제 곧 하단에 밸런스 게임 주제가 공개돼요!
            </motion.p>
            <CountdownTimer />
        </>
    );
}

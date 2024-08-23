import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import CardOptions from "@/features/RushGame/RushGameSections/CardOptions.tsx";
import Countdown from "@/features/RushGame/RushGameSections/Countdown.tsx";
import FinalResult from "@/features/RushGame/RushGameSections/FinalResult.tsx";
import SelectedCard from "@/features/RushGame/RushGameSections/SelectedCard.tsx";
import useRushGameStateContext from "@/hooks/Contexts/useRushGameStateContext.ts";
import { useFetchRushUserParticipationStatus } from "@/hooks/RushGame/useFetchRushUserParticipationStatus.ts";
import { useFetchTodayRushEvent } from "@/hooks/RushGame/useFetchTodayRushEvent.ts";
import useSetGamePhase from "@/hooks/RushGame/useSetGamePhase.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";

export default function RushGame() {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const { getTodayRushEvent } = useFetchTodayRushEvent();
    const gameState = useRushGameStateContext();
    const { getRushUserParticipationStatus, userParticipatedStatus } =
        useFetchRushUserParticipationStatus();

    const rushData = useLoaderData() as GetTotalRushEventsResponse;
    useSetGamePhase(rushData);

    useEffect(() => {
        getTodayRushEvent(cookies[COOKIE_KEY.ACCESS_TOKEN]);
        getRushUserParticipationStatus(cookies[COOKIE_KEY.ACCESS_TOKEN]);
    }, []);

    const renderRushGameContent = () => {
        if (gameState.phase === null) return null;
        switch (gameState.phase) {
            case CARD_PHASE.NOT_STARTED:
                return <Countdown />;
            case CARD_PHASE.IN_PROGRESS:
                if (userParticipatedStatus === null) return <></>;
                else {
                    if (!gameState.userParticipatedStatus) {
                        return <CardOptions />;
                    } else {
                        return <SelectedCard />;
                    }
                }
            case CARD_PHASE.COMPLETED:
                return <FinalResult />;
            default:
                return null;
        }
    };

    return (
        <section className="h-screen bg-n-white flex flex-col gap-8 justify-center items-center">
            {renderRushGameContent()}
        </section>
    );
}

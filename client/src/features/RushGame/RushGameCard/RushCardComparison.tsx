import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLORS, CARD_DAYS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import RushCard from "@/features/RushGame/RushGameCard/RushCard.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { GetTodayRushEventResponse } from "@/types/rushApi.ts";

const TEMP_CURRENT_DAY: (typeof CARD_DAYS)[keyof typeof CARD_DAYS] = CARD_DAYS.DAY1;

export default function RushCardComparison() {
    const [todayRushEventData, setTodayRushEventData] = useState<GetTodayRushEventResponse>();
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const { setUserParticipationStatus } = useRushGameContext();

    useEffect(() => {
        (async () => {
            try {
                const todayRushEventData = await RushAPI.getTodayRushEvent(
                    cookies[COOKIE_TOKEN_KEY]
                );
                setTodayRushEventData(todayRushEventData);
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }, []);

    // TODO: 카드 색상 랜덤으로 변경
    const leftOptionColor = CARD_COLORS[TEMP_CURRENT_DAY][CARD_TYPE.LEFT_OPTIONS];
    const rightOptionColor = CARD_COLORS[TEMP_CURRENT_DAY][CARD_TYPE.RIGHT_OPTIONS];

    const {
        leftOption: { mainText: leftOptionMainText = "", subText: leftOptionSubText = "" } = {},
        rightOption: { mainText: rightOptionMainText = "", subText: rightOptionSubText = "" } = {},
    } = todayRushEventData || {};

    const handleCardSelection = async (optionId: number) => {
        try {
            const response = await RushAPI.postSelectedRushOptionApply(
                cookies[COOKIE_TOKEN_KEY],
                optionId
            );

            if (response === 204) {
                const userParticipatedStatus = await RushAPI.getRushUserParticipationStatus(
                    cookies[COOKIE_TOKEN_KEY]
                );
                setUserParticipationStatus(userParticipatedStatus);
            } else if (response === 404) {
                console.log(`Error ${response}`);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard
                color={leftOptionColor}
                mainText={leftOptionMainText}
                subText={leftOptionSubText}
                onClick={() => handleCardSelection(CARD_TYPE.LEFT_OPTIONS)}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={rightOptionColor}
                mainText={rightOptionMainText}
                subText={rightOptionSubText}
                onClick={() => handleCardSelection(CARD_TYPE.RIGHT_OPTIONS)}
            />
        </div>
    );
}

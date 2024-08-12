import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLORS, CARD_DAYS, CARD_OPTIONS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import RushCard from "@/features/RushGame/RushGameCard/RushCard.tsx";
import { GetTodayRushEventResponse } from "@/types/rushApi.ts";

const TEMP_CURRENT_DAY: (typeof CARD_DAYS)[keyof typeof CARD_DAYS] = CARD_DAYS.DAY1;

export default function RushCardComparison() {
    const [todayRushEventData, setTodayRushEventData] = useState<GetTodayRushEventResponse>();
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);

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
        leftOption: {
            mainText: leftOptionMainText = CARD_OPTIONS[TEMP_CURRENT_DAY][CARD_TYPE.LEFT_OPTIONS]
                .mainText,
            subText: leftOptionSubText = CARD_OPTIONS[TEMP_CURRENT_DAY][CARD_TYPE.LEFT_OPTIONS]
                .subText,
        } = {},
        rightOption: {
            mainText: rightOptionMainText = CARD_OPTIONS[TEMP_CURRENT_DAY][CARD_TYPE.RIGHT_OPTIONS]
                .mainText,
            subText: rightOptionSubText = CARD_OPTIONS[TEMP_CURRENT_DAY][CARD_TYPE.RIGHT_OPTIONS]
                .subText,
        } = {},
    } = todayRushEventData || {};

    const handleCardSelection = async (optionId: number) => {
        try {
            await RushAPI.postSelectedRushOptionApply(cookies[COOKIE_TOKEN_KEY], optionId);
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

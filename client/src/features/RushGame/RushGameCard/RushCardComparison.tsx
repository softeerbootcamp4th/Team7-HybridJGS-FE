import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLORS, CARD_DAYS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import RushCard from "@/features/RushGame/RushGameCard/RushCard.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { CardOption } from "@/types/rushGame.ts";

const TEMP_CURRENT_DAY: (typeof CARD_DAYS)[keyof typeof CARD_DAYS] = CARD_DAYS.DAY1;

export default function RushCardComparison() {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const { gameState, updateUserStatusAndSelectedOption, updateCardOptions } =
        useRushGameContext();

    useEffect(() => {
        (async () => {
            try {
                const todayRushEventData = await RushAPI.getTodayRushEvent(
                    cookies[COOKIE_TOKEN_KEY]
                );

                // TODO: 카드 색상 랜덤으로 변경
                if (todayRushEventData) {
                    updateCardOptions(CARD_TYPE.LEFT_OPTIONS, {
                        mainText: todayRushEventData.leftOption.mainText,
                        subText: todayRushEventData.leftOption.subText,
                        color: CARD_COLORS[TEMP_CURRENT_DAY][CARD_TYPE.LEFT_OPTIONS],
                    });
                    updateCardOptions(CARD_TYPE.RIGHT_OPTIONS, {
                        mainText: todayRushEventData.rightOption.mainText,
                        subText: todayRushEventData.rightOption.subText,
                        color: CARD_COLORS[TEMP_CURRENT_DAY][CARD_TYPE.RIGHT_OPTIONS],
                    });
                }
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }, []);

    const handleCardSelection = async (optionId: CardOption) => {
        try {
            const response = await RushAPI.postSelectedRushOptionApply(
                cookies[COOKIE_TOKEN_KEY],
                optionId
            );

            if (response === 204) {
                await updateUserStatusAndSelectedOption(cookies[COOKIE_TOKEN_KEY], optionId);
            } else if (response === 404) {
                console.log(`Error ${response}`);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const leftOptionData = gameState.cardOptions[CARD_TYPE.LEFT_OPTIONS];
    const rightOptionData = gameState.cardOptions[CARD_TYPE.RIGHT_OPTIONS];

    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard
                color={leftOptionData.color}
                mainText={leftOptionData.mainText}
                subText={leftOptionData.subText}
                onClick={() => handleCardSelection(CARD_TYPE.LEFT_OPTIONS)}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={rightOptionData.color}
                mainText={rightOptionData.mainText}
                subText={rightOptionData.subText}
                onClick={() => handleCardSelection(CARD_TYPE.RIGHT_OPTIONS)}
            />
        </div>
    );
}

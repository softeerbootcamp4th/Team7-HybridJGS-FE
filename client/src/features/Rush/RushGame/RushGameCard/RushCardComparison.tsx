import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import { CARD_COLORS, CARD_DAYS, CARD_OPTIONS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import RushCard from "@/features/Rush/RushGame/RushGameCard/RushCard.tsx";

export default function RushCardComparison() {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);
    const currentDay: (typeof CARD_DAYS)[keyof typeof CARD_DAYS] = CARD_DAYS.DAY2;

    const leftOptionColor = CARD_COLORS[currentDay][CARD_TYPE.LEFT_OPTIONS];
    const rightOptionColor = CARD_COLORS[currentDay][CARD_TYPE.RIGHT_OPTIONS];

    const leftOptionTitle = CARD_OPTIONS[currentDay][CARD_TYPE.LEFT_OPTIONS].title;
    const rightOptionTitle = CARD_OPTIONS[currentDay][CARD_TYPE.RIGHT_OPTIONS].title;

    const leftOptionDescription = CARD_OPTIONS[currentDay][CARD_TYPE.LEFT_OPTIONS].description;
    const rightOptionDescription = CARD_OPTIONS[currentDay][CARD_TYPE.RIGHT_OPTIONS].description;

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
                title={leftOptionTitle}
                description={leftOptionDescription}
                onClick={() => handleCardSelection(CARD_TYPE.LEFT_OPTIONS)}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={rightOptionColor}
                title={rightOptionTitle}
                description={rightOptionDescription}
                onClick={() => handleCardSelection(CARD_TYPE.RIGHT_OPTIONS)}
            />
        </div>
    );
}

import {
    CARD_COLORS,
    CARD_DAYS,
    CARD_DESCRIPTION,
    CARD_SELECTED_STATUS,
    CARD_TITLES,
    CARD_TYPE,
} from "@/constants/Rush/rushCard.tsx";
import RushCard from "@/features/Rush/RushCard.tsx";

export default function RushCardComparison() {
    // TODO: 추후 API 연동
    const currentDay: (typeof CARD_DAYS)[keyof typeof CARD_DAYS] = CARD_DAYS.DAY2;
    const firstCardType: (typeof CARD_TYPE)[keyof typeof CARD_TYPE] = CARD_TYPE.FIRST_CARD;
    const secondCardType: (typeof CARD_TYPE)[keyof typeof CARD_TYPE] = CARD_TYPE.SECOND_CARD;
    const cardStatus: (typeof CARD_SELECTED_STATUS)[keyof typeof CARD_SELECTED_STATUS] =
        CARD_SELECTED_STATUS.FALSE;

    const firstCardColor = CARD_COLORS[currentDay][firstCardType];
    const secondCardColor = CARD_COLORS[currentDay][secondCardType];

    const firstCardTitle = CARD_TITLES[currentDay][firstCardType];
    const secondCardTitle = CARD_TITLES[currentDay][secondCardType];

    const firstCardDescription = CARD_DESCRIPTION[currentDay][firstCardType][cardStatus];
    const secondCardDescription = CARD_DESCRIPTION[currentDay][secondCardType][cardStatus];

    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard
                color={firstCardColor}
                title={firstCardTitle}
                description={firstCardDescription}
            />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard
                color={secondCardColor}
                title={secondCardTitle}
                description={secondCardDescription}
            />
        </div>
    );
}

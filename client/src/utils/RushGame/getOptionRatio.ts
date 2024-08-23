import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { CardOption, CardOptionState } from "@/types/rushGame.ts";

interface GetOptionRatioProps {
    cardOptions: {
        [key in CardOption]: CardOptionState;
    };
    option: CardOption;
}

export const getOptionRatio = ({ cardOptions, option }: GetOptionRatioProps) => {
    const total =
        cardOptions[CARD_OPTION.LEFT_OPTIONS].selectionCount +
        cardOptions[CARD_OPTION.RIGHT_OPTIONS].selectionCount;
    if (total === 0) return 0;
    const ratio = (cardOptions[option].selectionCount / total) * 100;
    return Math.round(ratio * 100) / 100;
};

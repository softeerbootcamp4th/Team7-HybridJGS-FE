import { CARD_OPTION } from "@/constants/Rush/rushCard.ts";
import { CardOption, RushGameContextType } from "@/types/rushGame.ts";

interface GetOptionRatioProps {
    gameState: RushGameContextType["gameState"];
    option: CardOption;
}

export const getOptionRatio = ({ gameState, option }: GetOptionRatioProps) => {
    const total =
        gameState.cardOptions[CARD_OPTION.LEFT_OPTIONS].selectionCount +
        gameState.cardOptions[CARD_OPTION.RIGHT_OPTIONS].selectionCount;
    if (total === 0) return 0;
    const ratio = (gameState.cardOptions[option].selectionCount / total) * 100;
    return Math.round(ratio * 100) / 100;
};

import { CardOption, RushGameStateType } from "@/types/rushGame.ts";

interface GetSelectedCardInfoProps {
    gameState: RushGameStateType;
    option: CardOption;
}

export const getSelectedCardInfo = ({ gameState, option }: GetSelectedCardInfoProps) => {
    const cardInfo = gameState.cardOptions[option];
    return {
        mainText: cardInfo.mainText,
        subText: cardInfo.subText,
        resultMainText: cardInfo.resultMainText,
        resultSubText: cardInfo.resultSubText,
        color: cardInfo.color,
        selectionCount: cardInfo.selectionCount,
    };
};

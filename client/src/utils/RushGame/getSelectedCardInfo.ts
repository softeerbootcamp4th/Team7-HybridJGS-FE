import { CardOption, CardOptionState } from "@/types/rushGame.ts";

interface GetSelectedCardInfoProps {
    cardOptions: {
        [key in CardOption]: CardOptionState;
    };
    option: CardOption;
}

export const getSelectedCardInfo = ({ cardOptions, option }: GetSelectedCardInfoProps) => {
    const cardInfo = cardOptions[option];
    return {
        mainText: cardInfo.mainText,
        subText: cardInfo.subText,
        resultMainText: cardInfo.resultMainText,
        resultSubText: cardInfo.resultSubText,
        color: cardInfo.color,
        selectionCount: cardInfo.selectionCount,
    };
};

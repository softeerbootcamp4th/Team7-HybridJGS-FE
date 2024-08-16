import { useMemo } from "react";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { CasperCardType, TransitionCasperCards } from "./TransitionCasperCards";

interface CasperCardsProps {
    cardList: CasperCardType[];
}

export function CasperCards({ cardList }: CasperCardsProps) {
    const cardLength = cardList.length;
    const cardLengthHalf = Math.floor(cardLength / 2);
    const visibleCardCount = useMemo(() => {
        const width = window.innerWidth;
        const cardWidth = CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH;

        return Math.ceil(width / cardWidth);
    }, []);
    const isMultipleLine = visibleCardCount * 2 <= cardLength;

    const topCardList = cardList.slice(0, isMultipleLine ? cardLengthHalf : cardLength);
    const bottomCardList = isMultipleLine ? cardList.slice(cardLengthHalf, cardLength) : [];

    const itemWidth = CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH;
    const gap = 40;
    const totalWidth = (itemWidth + gap) * topCardList.length;

    const isEndTopCard = (latestX: number) => {
        return latestX <= -totalWidth;
    };
    const isEndBottomCard = (latestX: number) => {
        return latestX >= 0;
    };

    return (
        <div className="flex flex-col self-start gap-800">
            <TransitionCasperCards
                cardList={topCardList}
                initialX={0}
                gap={gap}
                diffX={-totalWidth}
                totalWidth={totalWidth}
                isEndCard={isEndTopCard}
            />
            <TransitionCasperCards
                cardList={bottomCardList}
                initialX={-totalWidth}
                gap={gap}
                diffX={totalWidth}
                totalWidth={totalWidth}
                isEndCard={isEndBottomCard}
            />
        </div>
    );
}

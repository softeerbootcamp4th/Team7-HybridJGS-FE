import { useMemo } from "react";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import type { CasperCardType } from "@/types/casper";
import { TransitionCasperCards } from "./TransitionCasperCards";

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
    const totalWidth = (itemWidth + gap) * visibleCardCount;
    const paddedCasperWidth = CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH + gap;

    const isEndTopCard = (latestX: number) => {
        return latestX <= -paddedCasperWidth;
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
                visibleCardCount={visibleCardCount + 1}
                isEndCard={isEndTopCard}
            />
            <TransitionCasperCards
                cardList={bottomCardList}
                initialX={-paddedCasperWidth}
                gap={gap}
                diffX={totalWidth}
                visibleCardCount={visibleCardCount + 1}
                isEndCard={isEndBottomCard}
                isReverseCards
            />
        </div>
    );
}

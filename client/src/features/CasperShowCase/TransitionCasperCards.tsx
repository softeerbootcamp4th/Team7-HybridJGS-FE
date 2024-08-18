import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, type ResolvedValues, motion, useAnimation } from "framer-motion";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import { CasperCardType } from "@/types/casper";
import { TransitionCasperCardItem } from "./TransitionCasperCardItem";

interface TransitionCasperCardsProps {
    cardList: CasperCardType[];
    initialX: number;
    diffX: number;
    visibleCardCount: number;
    gap: number;
    isEndCard: (latestX: number) => boolean;
    isReverseCards?: boolean;
}

export function TransitionCasperCards({
    cardList,
    initialX,
    diffX,
    gap,
    visibleCardCount,
    isEndCard,
    isReverseCards = false,
}: TransitionCasperCardsProps) {
    const isAnimated = visibleCardCount <= cardList.length;
    const expandedCardList = useMemo(() => [...cardList, ...cardList, ...cardList], [cardList]);

    const containerRef = useRef<HTMLUListElement>(null);
    const transitionControls = useAnimation();

    const [x, setX] = useState<number>(initialX);
    const [visibleCardListIdx, setVisibleCardListIdx] = useState(0);

    const startAnimation = (x: number) => {
        transitionControls.start({
            x: [x, x + diffX],
            transition: CARD_TRANSITION(cardList.length),
        });
    };

    const stopAnimation = () => {
        transitionControls.stop();
        if (containerRef.current) {
            const computedStyle = window.getComputedStyle(containerRef.current);
            const matrix = new DOMMatrix(computedStyle.transform);
            setX(matrix.m41);
        }
    };

    const visibleCardList = useMemo(() => {
        const list = expandedCardList.slice(
            visibleCardListIdx,
            visibleCardListIdx + visibleCardCount * 2
        );

        if (isAnimated && isReverseCards) {
            return list.reverse();
        }

        return isAnimated ? list : cardList;
    }, [
        isReverseCards,
        expandedCardList,
        cardList,
        isAnimated,
        visibleCardCount,
        visibleCardListIdx,
    ]);

    useEffect(() => {
        startAnimation(x);
    }, []);

    const handleUpdateAnimation = (latest: ResolvedValues) => {
        if (isEndCard(parseInt(String(latest.x)))) {
            let nextIdx = visibleCardListIdx + visibleCardCount;

            // 만약 nextIdx가 cardList의 길이를 초과하면 배열의 처음부터 다시 index를 카운트하도록 함
            if (nextIdx >= cardList.length) {
                nextIdx = nextIdx % cardList.length;
            }

            setVisibleCardListIdx(nextIdx);
            startAnimation(initialX);
        }
    };

    return (
        <AnimatePresence>
            {isAnimated ? (
                <motion.ul
                    ref={containerRef}
                    className="flex"
                    animate={transitionControls}
                    style={{ gap: `${gap}px` }}
                    onUpdate={handleUpdateAnimation}
                >
                    {visibleCardList.map((card, idx) => (
                        <TransitionCasperCardItem
                            key={`${card.id}-${idx}`}
                            cardItem={card}
                            id={`${card.id}-${idx}`}
                            stopAnimation={stopAnimation}
                            startAnimation={() => startAnimation(x)}
                        />
                    ))}
                </motion.ul>
            ) : (
                <ul className="flex w-screen justify-center" style={{ gap: `${gap}px` }}>
                    {visibleCardList.map((card, idx) => (
                        <TransitionCasperCardItem
                            key={`${card.id}-${idx}`}
                            cardItem={card}
                            id={`${card.id}-${idx}`}
                        />
                    ))}
                </ul>
            )}
        </AnimatePresence>
    );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, type ResolvedValues, motion, useAnimation } from "framer-motion";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import type { CasperCardType } from "@/types/casper";
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

    const containerRef = useRef<HTMLUListElement>(null);
    const transitionControls = useAnimation();

    const [x, setX] = useState<number>(initialX);
    const [visibleCardList, setVisibleCardList] = useState<CasperCardType[]>([]);
    const [popCardIdx, setPopCardIdx] = useState(cardList.length - 1);

    const startAnimation = useCallback(
        (x: number) => {
            transitionControls.start({
                x: [x, x + diffX],
                transition: CARD_TRANSITION(visibleCardCount),
            });
        },
        [visibleCardCount, transitionControls]
    );

    const stopAnimation = useCallback(() => {
        transitionControls.stop();
        if (containerRef.current) {
            const computedStyle = window.getComputedStyle(containerRef.current);
            const matrix = new DOMMatrix(computedStyle.transform);
            setX(matrix.m41);
        }
    }, [transitionControls, containerRef]);

    useEffect(() => {
        const currentCardList = cardList.slice(0, visibleCardCount);
        const sortedCards = isReverseCards ? currentCardList.reverse() : currentCardList;
        setVisibleCardList(sortedCards);
        startAnimation(x);
    }, []);

    const updateVisibleCards = (prevCards: CasperCardType[]) => {
        const updatedCards = [...prevCards];
        const lastCardIdx = (popCardIdx + 1) % cardList.length;

        if (isReverseCards) {
            updatedCards.pop();
            updatedCards.unshift(cardList[lastCardIdx]);
        } else {
            updatedCards.shift();
            updatedCards.push(cardList[lastCardIdx]);
        }

        setPopCardIdx(lastCardIdx);

        return updatedCards;
    };

    const handleUpdateAnimation = (latest: ResolvedValues) => {
        const currentX = parseInt(String(latest.x), 10);

        if (isEndCard(currentX)) {
            setVisibleCardList((prevCards) => {
                const updatedCards = updateVisibleCards(prevCards);
                return updatedCards;
            });

            startAnimation(isReverseCards ? initialX : initialX);
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
                    {visibleCardList.map((card) => (
                        <TransitionCasperCardItem
                            key={card.id}
                            cardItem={card}
                            id={card.id}
                            stopAnimation={stopAnimation}
                            startAnimation={() => startAnimation(x)}
                        />
                    ))}
                </motion.ul>
            ) : (
                <ul className="flex w-screen justify-center" style={{ gap: `${gap}px` }}>
                    {cardList.map((card) => (
                        <TransitionCasperCardItem key={card.id} cardItem={card} id={card.id} />
                    ))}
                </ul>
            )}
        </AnimatePresence>
    );
}

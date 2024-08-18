import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, type ResolvedValues, motion, useAnimation } from "framer-motion";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import { CasperCardType } from "@/types/casper";
import { TransitionCasperCardItem } from "./TransitionCasperCardItem";

interface TransitionCasperCardsProps {
    cardList: CasperCardType[];
    initialX: number;
    diffX: number;
    totalWidth: number;
    gap: number;
    isEndCard: (latestX: number) => boolean;
}

export function TransitionCasperCards({
    cardList,
    initialX,
    diffX,
    totalWidth,
    gap,
    isEndCard,
}: TransitionCasperCardsProps) {
    const visibleCardCount = useMemo(() => {
        const width = window.innerWidth;
        const cardWidth = CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH;

        return Math.ceil(width / cardWidth);
    }, []);
    const isAnimated = visibleCardCount <= cardList.length;
    const expandedCardList = useMemo(() => [...cardList, ...cardList], [cardList]);

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
        if (isAnimated) {
            return [
                ...expandedCardList.slice(
                    visibleCardListIdx,
                    visibleCardListIdx + visibleCardCount
                ),
                ...expandedCardList.slice(
                    visibleCardListIdx + visibleCardCount,
                    visibleCardListIdx + visibleCardCount * 2
                ),
            ];
        }

        return cardList;
    }, [cardList, visibleCardCount, visibleCardListIdx]);

    useEffect(() => {
        startAnimation(x);
    }, [transitionControls, totalWidth]);

    const handleUpdateAnimation = (latest: ResolvedValues) => {
        if (isEndCard(parseInt(String(latest.x)))) {
            startAnimation(initialX);

            let nextIdx = visibleCardListIdx + visibleCardCount;

            // 만약 nextIdx가 cardList의 길이를 초과하면 0으로 초기화하거나 초과분을 조정합니다.
            if (visibleCardListIdx >= cardList.length) {
                nextIdx = visibleCardListIdx % cardList.length;
            }

            console.log(nextIdx);

            setVisibleCardListIdx(nextIdx);
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

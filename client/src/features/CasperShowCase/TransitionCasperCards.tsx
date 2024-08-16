import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import useLazyLoading from "@/hooks/useLazyLoading";
import { SelectedCasperIdxType } from "@/types/casperCustom";
import { CasperFlipCard } from "../CasperCustom/CasperFlipCard";

export interface CasperCardType {
    id: number;
    casperName: string;
    expectations: string;
    selectedCasperIdx: SelectedCasperIdxType;
}
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

    const containerRef = useRef<HTMLUListElement>(null);
    const transitionControls = useAnimation();

    const [x, setX] = useState<number>(initialX);

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

    useEffect(() => {
        startAnimation(x);
    }, [transitionControls, totalWidth]);

    const expandedCardList = useMemo(() => {
        if (isAnimated) {
            return [...cardList, ...cardList.slice(0, visibleCardCount)];
        }

        return cardList;
    }, [cardList]);

    const renderCardItem = (cardItem: CasperCardType, id: string) => {
        const [isFlipped, setIsFlipped] = useState<boolean>(false);
        const { isInView, cardRef } = useLazyLoading<HTMLLIElement>();

        const handleMouseEnter = () => {
            stopAnimation();
            setIsFlipped(true);
        };

        const handleMouseLeave = () => {
            startAnimation(x);
            setIsFlipped(false);
        };

        return (
            <li
                ref={cardRef}
                key={id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH,
                    height: CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_HEIGHT,
                }}
            >
                {isInView && (
                    <CasperFlipCard
                        card={cardItem}
                        size={CASPER_SIZE_OPTION.SM}
                        isFlipped={isFlipped}
                    />
                )}
            </li>
        );
    };

    return (
        <AnimatePresence>
            {isAnimated ? (
                <motion.ul
                    ref={containerRef}
                    className="flex"
                    animate={transitionControls}
                    style={{ gap: `${gap}px` }}
                    onUpdate={(latest) => {
                        if (isEndCard(parseInt(String(latest.x)))) {
                            startAnimation(initialX);
                        }
                    }}
                >
                    {expandedCardList.map((card, idx) => renderCardItem(card, `${card.id}-${idx}`))}
                </motion.ul>
            ) : (
                <ul className="flex w-screen justify-center" style={{ gap: `${gap}px` }}>
                    {expandedCardList.map((card, idx) => renderCardItem(card, `${card.id}-${idx}`))}
                </ul>
            )}
        </AnimatePresence>
    );
}

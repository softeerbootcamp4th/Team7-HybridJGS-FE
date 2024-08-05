import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import { SelectedCasperIdxType } from "@/contexts/casperCustomContext";
import CasperFlipCard from "../CasperCustom/CasperFlipCard";

export interface CasperCardType {
    id: string;
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

export default function TransitionCasperCards({
    cardList,
    initialX,
    diffX,
    totalWidth,
    gap,
    isEndCard,
}: TransitionCasperCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const transitionControls = useAnimation();

    const [x, setX] = useState<number>(initialX);

    const startAnimation = (x: number) => {
        transitionControls.start({
            x: [x, x + diffX],
            transition: CARD_TRANSITION,
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

    const renderCardItem = (cardItem: CasperCardType, id: string) => {
        const [isFlipped, setIsFlipped] = useState<boolean>(false);

        const handleMouseEnter = () => {
            stopAnimation();
            setIsFlipped(true);
        };

        const handleMouseLeave = () => {
            startAnimation(x);
            setIsFlipped(false);
        };

        return (
            <div key={id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <CasperFlipCard
                    card={cardItem}
                    size={CASPER_SIZE_OPTION.SM}
                    isFlipped={isFlipped}
                />
            </div>
        );
    };

    return (
        <motion.div
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
            {cardList.map((card) => renderCardItem(card, card.id))}
            {cardList.map((card) => renderCardItem(card, `${card.id}-clone`))}
        </motion.div>
    );
}

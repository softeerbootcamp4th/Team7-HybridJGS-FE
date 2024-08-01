import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CARD_TRANSITION } from "@/constants/CasperShowCase/showCase";
import { SelectedCasperIdxType } from "@/contexts/casperCustomContext";
import CasperCardFrontUI from "../CasperCustom/CasperCardFrontUI";

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

    const stopLeftAnimation = () => {
        transitionControls.stop();
        if (containerRef.current) {
            const computedStyle = window.getComputedStyle(containerRef.current);
            const matrix = new WebKitCSSMatrix(computedStyle.transform);
            setX(matrix.m41);
        }
    };

    useEffect(() => {
        startAnimation(x);
    }, [transitionControls, totalWidth]);

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
            {cardList.map((card) => (
                <div
                    key={card.id}
                    onMouseEnter={stopLeftAnimation}
                    onMouseLeave={() => startAnimation(x)}
                >
                    <CasperCardFrontUI
                        size="sm"
                        casperName={card.casperName}
                        hasRandomButton={false}
                        selectedCasperIdx={card.selectedCasperIdx}
                    />
                </div>
            ))}
            {cardList.map((card) => (
                <div
                    key={`${card.id}-clone`}
                    onMouseEnter={stopLeftAnimation}
                    onMouseLeave={() => startAnimation(x)}
                >
                    <CasperCardFrontUI
                        size="sm"
                        casperName={card.casperName}
                        hasRandomButton={false}
                        selectedCasperIdx={card.selectedCasperIdx}
                    />
                </div>
            ))}
        </motion.div>
    );
}

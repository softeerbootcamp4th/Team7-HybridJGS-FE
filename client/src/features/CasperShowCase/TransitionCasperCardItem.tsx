import { useState } from "react";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { CasperFlipCard } from "@/features/CasperCustom/CasperCard/CasperFlipCard";
import type { CasperCardType } from "@/types/casper";

interface TransitionCasperCardItemProps {
    cardItem: CasperCardType;
    id: string;
    stopAnimation?: () => void;
    startAnimation?: () => void;
}

export function TransitionCasperCardItem({
    cardItem,
    id,
    stopAnimation,
    startAnimation,
}: TransitionCasperCardItemProps) {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const handleMouseEnter = () => {
        stopAnimation && stopAnimation();
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        startAnimation && startAnimation();
        setIsFlipped(false);
    };

    return (
        <li
            key={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                width: CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_WIDTH,
                height: CASPER_CARD_SIZE[CASPER_SIZE_OPTION.SM].CARD_HEIGHT,
            }}
        >
            <CasperFlipCard card={cardItem} size={CASPER_SIZE_OPTION.SM} isFlipped={isFlipped} />
        </li>
    );
}

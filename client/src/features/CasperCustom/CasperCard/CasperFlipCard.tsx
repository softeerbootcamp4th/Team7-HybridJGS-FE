import { memo } from "react";
import { motion } from "framer-motion";
import { CASPER_CARD_SIZE, CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import type { CasperCardType } from "@/types/casper";
import { CasperCardBackUI } from "./CasperCardBackUI";
import { CasperCardFrontUI } from "./CasperCardFrontUI";

interface CasperFlipCardProps {
    size: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    card: Omit<CasperCardType, "id">;
    isFlipped: boolean;
}

function CasperFlipCard({ size, card, isFlipped }: CasperFlipCardProps) {
    return (
        <div style={{ perspective: "1000px" }}>
            <motion.div
                style={{
                    width: CASPER_CARD_SIZE[size].CARD_WIDTH,
                    height: CASPER_CARD_SIZE[size].CARD_HEIGHT,
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                >
                    <CasperCardFrontUI
                        size={size}
                        casperName={card.casperName}
                        hasRandomButton={false}
                        selectedCasperIdx={card.selectedCasperIdx}
                    />
                </div>
                <div
                    className="absolute w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <CasperCardBackUI
                        size={size}
                        casperName={card.casperName}
                        expectations={card.expectations}
                        selectedCasperIdx={card.selectedCasperIdx}
                    />
                </div>
            </motion.div>
        </div>
    );
}

const MemoizedCasperFlipCard = memo(CasperFlipCard);
export { MemoizedCasperFlipCard as CasperFlipCard };

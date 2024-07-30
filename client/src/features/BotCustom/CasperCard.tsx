import { cva } from "class-variance-authority";
import { COLOR_BACKGROUND_MAP, CUSTOM_OPTION } from "@/constants/BotCustom/casper";
import { useBotCustom } from "@/hooks/useBotCustom";
import CasperFace from "/public/assets/bot-custom/face.svg?react";

interface CasperCardProps {
    size?: "sm" | "lg";
}

const casperCardContainerVariants = cva(`relative`, {
    variants: {
        size: {
            sm: "w-[288px] h-[375px] rounded-700",
            lg: "w-[384px] h-[500px] rounded-800",
        },
    },
});

export default function CasperCard({ size = "lg" }: CasperCardProps) {
    const { selectedBotIdx } = useBotCustom();

    return (
        <div
            className={casperCardContainerVariants({
                size,
            })}
            style={{ backgroundColor: COLOR_BACKGROUND_MAP[selectedBotIdx[CUSTOM_OPTION.COLOR]] }}
        ></div>
    );
}

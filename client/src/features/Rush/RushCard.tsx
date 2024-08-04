import React from "react";
import { cva } from "class-variance-authority";
import {
    CARD_COLOR,
    CARD_DAYS,
    CARD_DESCRIPTION,
    CARD_SELECTED_STATUS,
    CARD_TITLES,
    CARD_TYPE,
} from "@/constants/Rush/rushCard.tsx";

interface RushCardProps {
    color: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
}

const backgroundGradients = cva(
    `flex flex-col gap-2 justify-center items-center w-[360px] h-[400px] text-n-neutral-950 rounded-800`,
    {
        variants: {
            color: {
                [CARD_COLOR.BLUE]: "bg-gradient-blue",
                [CARD_COLOR.RED]: "bg-gradient-red",
                [CARD_COLOR.YELLOW]: "bg-gradient-yellow",
                [CARD_COLOR.GREEN]: "bg-gradient-green",
            },
        },
        defaultVariants: {
            color: CARD_COLOR.GREEN,
        },
    }
);

type CardType = (typeof CARD_TYPE)[keyof typeof CARD_TYPE];

const currentDay = CARD_DAYS.DAY2;
const cardType: CardType = CARD_TYPE.FIRST_CARD;
const cardStatus = CARD_SELECTED_STATUS.FALSE;

const cardTitle = CARD_TITLES[currentDay][cardType];
const cardDescription = CARD_DESCRIPTION[currentDay][cardType][cardStatus];

export default function RushCard({ color }: RushCardProps) {
    return (
        <div className={backgroundGradients({ color: color })}>
            <h2 className="h-heading-2-bold text-center">{cardTitle}</h2>
            <p className="h-body-1-regular text-center">{cardDescription}</p>
        </div>
    );
}

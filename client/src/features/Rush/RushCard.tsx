import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { CARD_COLOR } from "@/constants/Rush/rushCard.tsx";

interface RushCardProps {
    color: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    title: string;
    description: ReactNode[];
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

export default function RushCard({ color, title, description }: RushCardProps) {
    return (
        <div className={backgroundGradients({ color })}>
            <h2 className="h-heading-2-bold text-center">{title}</h2>
            {description.map((text, index) => (
                <p key={index} className="h-body-1-regular text-center">
                    {text}
                </p>
            ))}
        </div>
    );
}

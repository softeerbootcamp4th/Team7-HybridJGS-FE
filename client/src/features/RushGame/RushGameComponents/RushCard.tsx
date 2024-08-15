import { cva } from "class-variance-authority";
import { CARD_COLOR } from "@/constants/Rush/rushCard.ts";

interface RushCardProps {
    color: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    mainText: string;
    subText: string;
    onClick?: () => void;
}

const backgroundGradients = cva(
    `flex flex-col gap-2 justify-center items-center w-[360px] h-[400px] text-n-neutral-950 rounded-800 p-10 break-keep cursor-pointer hover:scale-[1.05] hover:duration-200`,
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

export default function RushCard({ color, mainText, subText, onClick }: RushCardProps) {
    return (
        <div className={backgroundGradients({ color })} onClick={onClick}>
            <h2 className="h-heading-2-bold text-center max-w-56">{mainText}</h2>
            <p className="h-body-1-regular text-center max-w-56">{subText}</p>
        </div>
    );
}

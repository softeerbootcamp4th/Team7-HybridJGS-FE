import { VariantProps, cva } from "class-variance-authority";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";

interface RushProgressBarProps {
    leftOptionRatio: number;
    rightOptionRatio: number;
}

const barStyle = cva("flex items-center", {
    variants: {
        color: {
            green: "bg-gradient-green",
            red: "bg-gradient-red",
        },
        status: {
            winning: "text-n-neutral-950",
            losing: "text-n-neutral-500",
        },
        textAlign: {
            left: "justify-start",
            right: "justify-end",
        },
    },
    defaultVariants: {
        status: "winning",
    },
});

type BarStyleProps = VariantProps<typeof barStyle>;

interface BarProps extends BarStyleProps {
    ratio: number;
}

function Bar({ ratio, color, status, textAlign }: BarProps) {
    return (
        <span className={barStyle({ color, status, textAlign })} style={{ width: `${ratio}%` }}>
            <p className="px-3">{ratio}%</p>
        </span>
    );
}

export default function RushProgressBar({
    leftOptionRatio,
    rightOptionRatio,
}: RushProgressBarProps) {
    const { gameState } = useRushGameContext();
    const isCompleted = gameState.phase === "COMPLETED";
    const leftStatus = isCompleted && leftOptionRatio < rightOptionRatio ? "losing" : "winning";
    const rightStatus = isCompleted && rightOptionRatio < leftOptionRatio ? "losing" : "winning";

    return (
        <div className="h-heading-3-bold h-[66px] flex justify-between">
            <Bar ratio={leftOptionRatio} color="green" status={leftStatus} textAlign="left" />
            <Bar ratio={rightOptionRatio} color="red" status={rightStatus} textAlign="right" />
        </div>
    );
}

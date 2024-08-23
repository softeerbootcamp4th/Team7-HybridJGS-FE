import { VariantProps, cva } from "class-variance-authority";

const barVariants = cva(`flex items-center`, {
    variants: {
        color: {
            green: "bg-gradient-green",
            red: "bg-gradient-red",
            blue: "bg-gradient-blue",
            yellow: "bg-gradient-yellow",
            gray: "bg-n-neutral-100",
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

type BarVariantsProps = VariantProps<typeof barVariants>;

interface BarProps extends BarVariantsProps {
    ratio: number;
    isAllZero: boolean;
}

export default function RushBar({ ratio, color, status, textAlign, isAllZero }: BarProps) {
    const barColor = isAllZero ? "gray" : color;
    const barStatus = isAllZero ? "losing" : status;
    const barWidth = isAllZero ? "50%" : `${ratio}%`;

    return (
        <span
            className={barVariants({ color: barColor, status: barStatus, textAlign })}
            style={{ width: barWidth }}
        >
            <p className="px-3 z-40">{ratio}%</p>
        </span>
    );
}

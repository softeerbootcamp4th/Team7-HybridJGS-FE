import { VariantProps, cva } from "class-variance-authority";

const barVariants = cva(`flex items-center`, {
    variants: {
        color: {
            green: "bg-gradient-green",
            red: "bg-gradient-red",
            blue: "bg-gradient-blue",
            yellow: "bg-gradient-yellow",
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
}

export default function RushBar({ ratio, color, status, textAlign }: BarProps) {
    return (
        <span className={barVariants({ color, status, textAlign })} style={{ width: `${ratio}%` }}>
            <p className="px-3">{ratio}%</p>
        </span>
    );
}

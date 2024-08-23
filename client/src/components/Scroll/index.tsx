import { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface ScrollProps {
    type: "light" | "dark";
    children: ReactNode;
    onClick?: () => void;
}

const scrollTextVariants = cva(`h-body-2-regular`, {
    variants: {
        type: {
            light: "text-n-white",
            dark: "text-n-neutral-500",
        },
    },
});

export default function Scroll({ type, children, onClick }: ScrollProps) {
    return (
        <div
            className={`inline-flex flex-col items-center gap-500 ${onClick && "cursor-pointer"}`}
            onClick={onClick}
        >
            <div className={scrollTextVariants({ type })}>{children}</div>
            <img
                alt="아래 스크롤 아이콘"
                src="/assets/icons/arrow-down.svg"
                className="w-[72px] h-[32px]"
            />
        </div>
    );
}

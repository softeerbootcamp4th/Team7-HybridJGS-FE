import { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface ScrollProps {
    type: "light" | "dark";
    children: ReactNode;
}

const scrollTextVariants = cva(`h-body-2-regular`, {
    variants: {
        type: {
            light: "text-n-white",
            dark: "text-n-neutral-500",
        },
    },
});

export default function Scroll({ type, children }: ScrollProps) {
    return (
        <div className="inline-flex flex-col items-center gap-500">
            <div className={scrollTextVariants({ type })}>{children}</div>
            <img
                alt="아래 스크롤 아이콘"
                src="/assets/icon/arrow-down.svg"
                className="w-[72px] h-[32px]"
            />
        </div>
    );
}

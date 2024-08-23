import { ReactNode, memo } from "react";
import { cva } from "class-variance-authority";

export interface CategoryProps {
    children: ReactNode;
    type: "basic" | "limited" | "selected";
}

const categoryVariants = cva(`w-fit px-300 py-200 rounded-1000 text-n-white h-body-2-regular`, {
    variants: {
        type: {
            basic: "bg-n-neutral-500",
            limited: "bg-s-red",
            selected: "bg-s-blue",
        },
    },
});

function Category({ type, children }: CategoryProps) {
    return <span className={categoryVariants({ type })}>{children}</span>;
}

export default memo(Category);

import { HTMLProps } from "react";
import { cva } from "class-variance-authority";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    isValid?: boolean;
    type: "lg" | "sm";
}

const ButtonVariants = cva(`transition-all`, {
    variants: {
        isValid: {
            true: "text-neutral-950 border-neutral-950 bg-white hover:bg-neutral-100",
            false: "text-neutral-300 border-neutral-300 bg-neutral-100",
        },
        type: {
            lg: "w-[266px] rounded-full py-[16px] border-2",
            sm: "inline px-[12px] py-[8px] rounded-xl border",
        },
    },
});

export default function Button({ isValid = true, type, children, ...restProps }: ButtonProps) {
    return (
        <button className={ButtonVariants({ isValid, type })} disabled={!isValid} {...restProps}>
            {children}
        </button>
    );
}

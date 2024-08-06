import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isValid?: boolean;
    buttonSize: "lg" | "sm";
}

const ButtonVariants = cva(`transition-all`, {
    variants: {
        isValid: {
            true: "text-neutral-950 border-neutral-950 bg-white hover:bg-neutral-100",
            false: "text-neutral-300 border-neutral-300 bg-neutral-100",
        },
        size: {
            lg: "w-[266px] rounded-full py-[16px] border",
            sm: "inline px-[12px] py-[8px] rounded-xl border",
        },
    },
});

export default function Button({
    isValid = true,
    buttonSize,
    children,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={ButtonVariants({ isValid, size: buttonSize })}
            disabled={!isValid}
            {...restProps}
        >
            {children}
        </button>
    );
}

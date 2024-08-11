import { ComponentProps } from "react";
import { cva } from "class-variance-authority";

interface InputProps extends ComponentProps<"input"> {
    label?: string;
    inputSize?: "lg" | "sm";
}

const InputVariants = cva(`border border-neutral-950 rounded-lg text-neutral-950 h-body-1-medium`, {
    variants: {
        inputSize: {
            lg: "p-[16px] w-[360px]",
            sm: "p-[8px] w-[240px]",
        },
    },
});

export default function Input({
    label,
    value,
    onChange,
    inputSize = "lg",
    ...restProps
}: InputProps) {
    return (
        <div className="flex items-center">
            {label && <p className="text-neutral-950 h-body-1-bold mx-[20px]">{label}</p>}
            <input
                className={InputVariants({ inputSize })}
                value={value}
                onChange={onChange}
                {...restProps}
            />
        </div>
    );
}

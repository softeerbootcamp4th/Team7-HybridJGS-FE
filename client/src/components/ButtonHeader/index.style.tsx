import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    `h-body-2-medium h-[64px] py-300 px-200 inline-flex items-center border-b-2`,
    {
        variants: {
            isSelected: {
                true: "",
                false: "text-n-neutral-500 border-transparent",
            },
            type: {
                light: "",
                dark: "",
            },
        },
        compoundVariants: [
            {
                isSelected: true,
                type: "light",
                className: "border-n-neutral-950 text-n-neutral-950",
            },
            {
                isSelected: true,
                type: "dark",
                className: "border-n-white text-n-white",
            },
        ],
    }
);

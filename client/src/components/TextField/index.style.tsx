import { cva } from "class-variance-authority";

export const labelVariants = cva(`text-n-white h-body-2-regular`, {
    variants: {
        isSmallSize: {
            true: "w-[390px]",
            false: "w-[560px]",
        },
    },
});

export const inputVariants = cva(
    `relative bg-n-neutral-950 py-[19px] px-500 rounded-400 focus-within:bg-n-neutral-500 border border-transparent focus-within:border-s-blue cursor-pointer`,
    {
        variants: {
            isSmallSize: {
                true: "w-[390px]",
                false: "w-[560px] h-[216px]",
            },
        },
    }
);

export const requiredTextVariants = cva(`inline`, {
    variants: {
        isRequired: {
            true: "text-s-blue",
        },
    },
});

export const valueLengthTextVariants = cva(`absolute right-500 h-body-2-regular`, {
    variants: {
        isFocused: {
            true: "text-s-blue",
            false: "text-n-neutral-500",
        },
        isSmallSize: {
            true: "translate-y-[-50%] top-[50%]",
            false: "bottom-700",
        },
    },
});

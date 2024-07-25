import { cva } from "class-variance-authority";

export const checkBoxVariants = cva(`absolute w-6 h-6 left-0 top-0 rounded-200`, {
    variants: {
        isChecked: {
            true: `bg-s-blue`,
            false: `bg-n-neutral-100`,
        },
    },
});

export const checkBoxContainerVariants = cva(
    `relative w-6 h-6 rounded-200 transition-all duration-200`,
    {
        variants: {
            isChecked: {
                true: "hover:shadow-s-blue",
            },
        },
    }
);

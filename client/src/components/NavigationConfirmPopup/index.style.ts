import { cva } from "class-variance-authority";

export const buttonStyles = cva("flex-1 py-400 rounded-1000 h-body-1-regular transition-all", {
    variants: {
        variant: {
            primary: "bg-s-blue border border-s-blue text-n-white hover:bg-s-hover",
            secondary: "bg-n-white border border-s-blue text-s-blue hover:bg-neutral-100",
        },
    },
});

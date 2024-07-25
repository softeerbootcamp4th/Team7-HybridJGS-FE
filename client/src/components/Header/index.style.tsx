import { cva } from "class-variance-authority";

export const backgroundBlurVariants = cva(`absolute h-16 backdrop-blur-[32px] w-full z-[-1]`, {
    variants: {
        type: {
            light: "bg-[#d0d0d0]/[.08]",
            dark: "bg-n-white/[.08]",
        },
    },
});

export const logoVariants = cva(`h-heading-3-medium !text-[24px] !leading-8 h-[32px] self-center`, {
    variants: {
        type: {
            light: "text-n-neutral-950",
            dark: "text-n-white",
        },
    },
});

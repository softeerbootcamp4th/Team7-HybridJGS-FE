import { Transition, Variants } from "framer-motion";

export const DISSOLVE: Variants = {
    offscreen: { opacity: 0 },
    onscreen: {
        opacity: 1,
        transition: { duration: 0.5 } as Transition,
    },
};

export const ASCEND: Variants = {
    offscreen: { opacity: 0, y: 40 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 } as Transition,
    },
};

export const ASCEND_DESCEND: Variants = {
    offscreen: { y: 40 },
    onscreen: {
        y: 0,
        transition: {
            duration: 0.7,
            repeat: Infinity,
            repeatType: "mirror",
        } as Transition,
    },
};

export const SCROLL_MOTION = (animation: Variants, amount: number = 0.8) => ({
    initial: "offscreen",
    whileInView: "onscreen",
    viewport: { once: true, amount: amount },
    variants: animation,
});

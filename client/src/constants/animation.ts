import { Transition, Variants } from "framer-motion";

export const DISSOLVE: Variants | Transition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
};

export const ASCEND: Variants | Transition = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
};

export const ASCEND_DESCEND: Variants | Transition = {
    initial: { y: 40 },
    animate: { y: 0 },
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" },
};

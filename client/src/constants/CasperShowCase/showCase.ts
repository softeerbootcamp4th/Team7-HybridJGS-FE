export const CARD_TRANSITION = (itemLength: number) => ({
    x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: itemLength,
        ease: "linear",
    },
});

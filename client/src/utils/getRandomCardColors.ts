import { CARD_COLOR } from "@/constants/Rush/rushCard.ts";

export function getRandomCardColors() {
    const colors = Object.values(CARD_COLOR);
    const leftColorIdx = Math.floor(Math.random() * colors.length);
    let rightColorIdx = Math.floor(Math.random() * colors.length);

    while (rightColorIdx === leftColorIdx) {
        rightColorIdx = Math.floor(Math.random() * colors.length);
    }

    return {
        leftColor: colors[leftColorIdx],
        rightColor: colors[rightColorIdx],
    };
}

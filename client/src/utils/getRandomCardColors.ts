import { CARD_COLOR } from "@/constants/Rush/rushCard.ts";

function getRandomTwoIndices(arrayLength: number): [number, number] {
    if (arrayLength < 2) {
        throw new Error("두 개의 고유 인덱스를 선택하려면 배열에 최소 2개의 요소가 있어야 합니다.");
    }

    const indices = Array.from({ length: arrayLength }, (_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return [indices[0], indices[1]];
}

export function getRandomCardColors() {
    const colors = Object.values(CARD_COLOR);

    const [leftColorIdx, rightColorIdx] = getRandomTwoIndices(colors.length);

    return {
        leftColor: colors[leftColorIdx],
        rightColor: colors[rightColorIdx],
    };
}

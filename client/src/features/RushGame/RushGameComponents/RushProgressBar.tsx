import { CARD_COLOR, CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import RushBar from "@/features/RushGame/RushGameComponents/RushBar.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";

interface RushProgressBarProps {
    leftOptionRatio: number;
    rightOptionRatio: number;
}

export default function RushProgressBar({
    leftOptionRatio,
    rightOptionRatio,
}: RushProgressBarProps) {
    const { gameState } = useRushGameContext();
    const isCompleted = gameState.phase === CARD_PHASE.COMPLETED;
    const leftStatus = isCompleted && leftOptionRatio < rightOptionRatio ? "losing" : "winning";
    const rightStatus = isCompleted && rightOptionRatio < leftOptionRatio ? "losing" : "winning";

    return (
        <div className="h-heading-3-bold h-[66px] flex justify-between">
            <RushBar
                ratio={leftOptionRatio}
                color={CARD_COLOR.GREEN}
                status={leftStatus}
                textAlign="left"
            />
            <RushBar
                ratio={rightOptionRatio}
                color={CARD_COLOR.RED}
                status={rightStatus}
                textAlign="right"
            />
        </div>
    );
}

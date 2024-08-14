import { useRushGameContext } from "@/hooks/useRushGameContext.ts";

interface RushProgressBarProps {
    leftOptionRatio: number;
    rightOptionRatio: number;
}

// TODO: 비율대로 프로그래스바 움직이는 로직 구현
export default function RushProgressBar({
    leftOptionRatio,
    rightOptionRatio,
}: RushProgressBarProps) {
    const { gameState } = useRushGameContext();
    return (
        <div className="h-heading-3-bold h-[66px] flex justify-between text-n-neutral-950">
            <p
                className={`bg-gradient-green flex items-center w-1/2 ${gameState.phase === "COMPLETED" && leftOptionRatio < rightOptionRatio && "text-n-neutral-500"}`}
            >
                {leftOptionRatio}%
            </p>
            <p
                className={`bg-gradient-red flex items-center w-1/2 ${gameState.phase === "COMPLETED" && rightOptionRatio < leftOptionRatio && "text-n-neutral-500"}`}
            >
                {rightOptionRatio}%
            </p>
        </div>
    );
}

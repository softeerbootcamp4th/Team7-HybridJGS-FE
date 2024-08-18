import Category from "@/components/Category";
import { WinStatus } from "@/types/rushGame.ts";

interface RushResultOptionDisplayProps {
    mainText: string;
    winStatus: WinStatus;
    isUserSelected: boolean;
}

export default function RushResultOptionDisplay({
    mainText,
    winStatus,
    isUserSelected,
}: RushResultOptionDisplayProps) {
    const categoryType = winStatus === "Win" ? "limited" : "basic";
    return (
        <div className="flex gap-2 items-center">
            <p
                className={`h-heading-4-bold ${winStatus === "Win" ? "text-n-neutral-950" : "text-n-neutral-500"}`}
            >
                {mainText}
            </p>
            <Category type={categoryType}>{winStatus}</Category>
            {isUserSelected && <Category type="selected">당신의 선택</Category>}
        </div>
    );
}

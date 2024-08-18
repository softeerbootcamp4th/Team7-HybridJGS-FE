import Category from "@/components/Category";

interface RushCurrentOptionDisplayProps {
    mainText: string;
    userSelectedOptionRatio: number;
    oppositeOptionRatio: number;
    isUserSelected: boolean;
}

export default function RushCurrentOptionDisplay({
    mainText,
    userSelectedOptionRatio,
    oppositeOptionRatio,
    isUserSelected,
}: RushCurrentOptionDisplayProps) {
    return (
        <div className="flex gap-2 items-center">
            <p className="h-heading-4-bold text-n-neutral-950">{mainText}</p>
            {userSelectedOptionRatio > oppositeOptionRatio && (
                <Category type="limited">우세해요!</Category>
            )}
            {isUserSelected && <Category type="selected">당신의 선택</Category>}
        </div>
    );
}

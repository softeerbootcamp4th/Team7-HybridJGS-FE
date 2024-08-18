import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import { formatTime } from "@/utils/formatTime.ts";

function TimeDisplay({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex flex-col justify-center items-center gap-3 w-[116px]">
            <p className="h-detail-1-regular text-n-neutral-500">{label}</p>
            <p className="h-heading-1-bold">{value}</p>
        </span>
    );
}

export default function RushCountdown() {
    const { runCountdown } = useRushGameContext();
    const minutes = Math.floor((runCountdown % 3600) / 60);
    const seconds = runCountdown % 60;

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-[150px]">
            <p className="h-body-2-medium text-n-neutral-500">
                밸런스 게임 결과 공개까지 남은 시간
            </p>
            <div className="flex items-end text-n-neutral-950">
                <TimeDisplay label="Minutes" value={formatTime(minutes)} />
                <p className="h-heading-1-bold">:</p>
                <TimeDisplay label="Seconds" value={formatTime(seconds)} />
            </div>
        </div>
    );
}

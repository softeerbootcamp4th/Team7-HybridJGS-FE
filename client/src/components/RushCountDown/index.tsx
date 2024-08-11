interface RushCountDownProps {
    countdown: number;
}

export default function RushCountDown({ countdown }: RushCountDownProps) {
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    const formatTime = (time: number) => time.toString().padStart(2, "0");

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-[150px]">
            <p className="h-body-2-medium text-n-neutral-500">
                밸런스 게임 결과 공개까지 남은 시간
            </p>
            <div className="flex items-end text-n-neutral-950">
                <span className="flex flex-col justify-center items-center gap-3 w-[116px]">
                    <p className="h-detail-1-regular text-n-neutral-500">Minutes</p>
                    <p className="h-heading-1-bold">{formatTime(minutes)}</p>
                </span>
                <p className="h-heading-1-bold">:</p>
                <span className="flex flex-col justify-center items-center gap-3 w-[116px]">
                    <p className="h-detail-1-regular text-n-neutral-500">Seconds</p>
                    <p className="h-heading-1-bold">{formatTime(seconds)}</p>
                </span>
            </div>
        </div>
    );
}

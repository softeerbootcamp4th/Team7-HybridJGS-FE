export interface LotteryEventProps {
    rank: number;
    image: string;
    prizeName: string;
    winnerCount: number;
}

export default function LotteryEvent({ rank, image, prizeName, winnerCount }: LotteryEventProps) {
    return (
        <div className="flex flex-col gap-400 w-[100px] h-[156px]">
            <div className="relative w-[100px] h-[100px] rounded-500 bg-n-white flex justify-center items-center">
                <img src={image} alt="event prize" className="w-[80px]" />
                <p className="absolute bottom-0 right-0 translate-x-1/4 z-10 h-detail-1-bold rounded-full bg-s-red p-2 text-n-white">
                    {rank}등
                </p>
            </div>
            <span className="flex flex-col justify-center items-center h-body-2-regular text-n-white">
                <p className="text-nowrap">{prizeName}</p>
                <p>{winnerCount > 1 && `(${winnerCount}명)`}</p>
            </span>
        </div>
    );
}

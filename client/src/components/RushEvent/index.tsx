import { RushEventProps } from "@/constants/Main/rushEventData.ts";
import { formatSingleDateWithSlash } from "@/utils/formatDate.ts";

export interface TotalRushEventsProps extends RushEventProps {
    id: number;
    date: string;
    isPastEvent: boolean;
    isTodayEvent: boolean;
}

export default function RushEvent({
    date,
    image,
    prizeName,
    isPastEvent,
    isTodayEvent,
}: Omit<TotalRushEventsProps, "id">) {
    const borderClass = isTodayEvent ? "border-s-red" : "border-n-neutral-300";
    const opacityClass = isPastEvent && "opacity-50";
    const textClass = isTodayEvent ? "text-s-red" : "text-n-neutral-950";

    return (
        <div
            className={`relative w-[160px] h-[200px] py-7 px-[15px] rounded-500 bg-n-white flex flex-col gap-4 justify-between items-center border ${borderClass} ${opacityClass}`}
        >
            <p className={`h-body-2-bold ${textClass} text-nowrap`}>
                {isTodayEvent ? "Today" : formatSingleDateWithSlash(date)}
            </p>
            <img src={image} alt="event prize" className="w-[130px]" />
            <p className="h-body-2-medium text-n-neutral-950 text-nowrap">{prizeName}</p>
            {isPastEvent && (
                <p
                    className="h-14 w-[180px] rounded-1000 shadow-[0_0_8px_0_rgba(0,0,0,0.25)] absolute z-50 h-body-1-bold bg-n-white/[.7] backdrop-blur-lg text-n-black flex justify-center items-center
                  top-[70px] transform rotate-[15deg]"
                >
                    선착순 마감
                </p>
            )}
        </div>
    );
}

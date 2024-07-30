import { useMemo } from "react";
import { formatDate } from "@/utils/formatDate.ts";

export interface RushEventProps {
    id: number;
    date: string;
    image: string;
    prizeName: string;
}

export default function RushEvent({ date, image, prizeName }: RushEventProps) {
    // TODO: 백엔드와 상의 후 게임 진행 상태 값 받는 걸로 변경
    const { isPastEvent, isTodayEvent } = useMemo(() => {
        const eventDate = new Date(date.split(" ")[0]);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);

        return {
            isPastEvent: eventDate.getTime() < today.getTime(),
            isTodayEvent: eventDate.getTime() === today.getTime(),
        };
    }, [date]);

    const borderClass = isTodayEvent ? "border-s-red" : "border-n-neutral-300";
    const opacityClass = isPastEvent && "opacity-50";

    return (
        <div
            className={`relative w-[160px] h-[200px] py-7 px-5 rounded-500 bg-n-white flex flex-col gap-4 justify-between items-center border ${borderClass} ${opacityClass}`}
        >
            <p
                className={`h-body-2-bold ${isTodayEvent ? "text-s-red" : "text-n-neutral-950"} text-nowrap`}
            >
                {isTodayEvent ? "Today" : formatDate(date)}
            </p>
            <img src={image} alt="event prize" className="object-cover" />
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

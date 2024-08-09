import { useEffect, useState } from "react";
import { RushAPI } from "@/apis/rushAPI.ts";
import RushEvent, { TotalRushEventsProps } from "@/components/RushEvent";
import { rushEventData } from "@/constants/Main/rushEventData.ts";
import { Section } from "@/features/Main/Section.tsx";
import { SectionKeyProps } from "@/types/sections.ts";
import { formatEventDateRangeWithDot } from "@/utils/formatDate.ts";

export function Rush({ id }: SectionKeyProps) {
    const [rushEvents, setRushEvents] = useState<TotalRushEventsProps[]>([]);
    const [startDateTime, setStartDateTime] = useState<string | null>(null);
    const [endDateTime, setEndDateTime] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const data = await RushAPI.getRush();
            const serverDateTime = new Date(data.serverDateTime);
            setStartDateTime(data.eventsStartDate);
            setEndDateTime(data.eventsEndDate);

            const events = data.events.map((event) => {
                const rushEvent = rushEventData.find((re) => re.id === event.rushEventId);
                const eventEndTime = new Date(event.endDateTime);
                return {
                    id: event.rushEventId,
                    date: event.startDateTime,
                    image: rushEvent.image,
                    prizeName: rushEvent.prizeName,
                    isPastEvent: serverDateTime > eventEndTime,
                    isTodayEvent:
                        event.rushEventId === data.todayEventId && serverDateTime <= eventEndTime,
                };
            });

            setRushEvents(events);
        })();
    }, []);

    return (
        <Section
            id={id}
            backgroundColor="bg-n-white"
            title="Event 2. 선착순 이벤트"
            titleColor="text-n-black"
            subtitle="매일 315명에게! 짜릿짜릿 선착순 밸런스 게임"
            description="매일 오후 10시! 선착순 밸런스 게임 참여하고 선물 받자!"
            descriptionColor="text-s-red"
            url="/rush"
        >
            <div className="flex flex-col gap-8 py-8 px-14 m-2 rounded-500 w-[1200px] h-[460px] bg-n-neutral-50">
                <div className="flex gap-[110px]">
                    <div className="flex flex-col gap-3">
                        <p className="h-heading-4-bold text-n-black">이벤트 기간</p>
                        <span className="flex flex-col">
                            <p className="h-body-1-regular text-n-neutral-500">
                                {startDateTime && endDateTime
                                    ? formatEventDateRangeWithDot(startDateTime, endDateTime)
                                    : ""}
                            </p>
                            <p className="h-body-1-regular text-s-red">매일 오후 10시!</p>
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="h-heading-4-bold text-n-black">참여 방법</p>
                        <p className="h-body-1-regular text-n-neutral-500">
                            오후 10시 부터 단 10분 간 공개되는 밸런스 게임. 둘 중 마음에 드는 쪽을
                            빠르게 선택해요!
                            <br />
                            10시 10분, 밸런스 게임이 종료되었을 때, 이긴 쪽을 선택한 선착순
                            315명에게 상품을 드려요.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="h-heading-4-bold text-n-black">이벤트 경품</p>
                    <div className="flex gap-6">
                        {rushEvents.map((event) => (
                            <RushEvent
                                key={event.id}
                                date={event.date}
                                image={event.image}
                                prizeName={event.prizeName}
                                isPastEvent={event.isPastEvent}
                                isTodayEvent={event.isTodayEvent}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

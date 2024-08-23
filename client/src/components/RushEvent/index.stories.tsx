import type { Meta, StoryFn } from "@storybook/react";
import RushEvent from "./index";

const meta: Meta<typeof RushEvent> = {
    title: "RushEvent",
    component: RushEvent,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        date: { control: "text", description: "선착순 이벤트 시작 날짜" },
        image: { control: "text", description: "선착순 이벤트 경품 이미지" },
        prizeName: { control: "text", description: "선착순 이벤트 경품 이름" },
        isPastEvent: { control: "boolean", description: "이벤트가 종료되었는지 여부" },
        isTodayEvent: { control: "boolean", description: "오늘 이벤트 여부" },
    },
};

export default meta;

export const AllPrizes: StoryFn<typeof RushEvent> = () => {
    interface RushEventProps {
        id: number;
        date: string;
        image: string;
        prizeName: string;
        isPastEvent: boolean;
        isTodayEvent: boolean;
    }

    const rushEventDataDummy: RushEventProps[] = [
        {
            id: 1,
            date: "2024-08-01T02:35:57.397Z",
            image: "/assets/main/rush/prize-1.png",
            prizeName: "영화 예매권",
            isPastEvent: true,
            isTodayEvent: false,
        },
        {
            id: 2,
            date: "2024-08-02T02:35:57.397Z",
            image: "/assets/main/rush/prize-2.png",
            prizeName: "야구 관람권",
            isPastEvent: true,
            isTodayEvent: false,
        },
        {
            id: 3,
            date: "2024-08-03T02:35:57.397Z",
            image: "/assets/main/rush/prize-3.jpg",
            prizeName: "올리브영 상품권",
            isPastEvent: true,
            isTodayEvent: false,
        },
        {
            id: 4,
            date: "2024-08-04T02:35:57.397Z",
            image: "/assets/main/rush/prize-4.jpeg",
            prizeName: "쿠팡 기프트카드",
            isPastEvent: true,
            isTodayEvent: true,
        },
        {
            id: 5,
            date: "2024-08-05T02:35:57.397Z",
            image: "/assets/main/rush/prize-5.jpg",
            prizeName: "배달의민족 기프트카드",
            isPastEvent: false,
            isTodayEvent: false,
        },
        {
            id: 6,
            date: "2024-08-06T02:35:57.397Z",
            image: "/assets/main/rush/prize-6.jpg",
            prizeName: "BBQ 기프트카드",
            isPastEvent: false,
            isTodayEvent: false,
        },
    ];

    return (
        <>
            {rushEventDataDummy.map((event) => (
                <RushEvent
                    key={event.id}
                    date={event.date}
                    image={event.image}
                    prizeName={event.prizeName}
                    isPastEvent={event.isPastEvent}
                    isTodayEvent={event.isTodayEvent}
                />
            ))}
        </>
    );
};

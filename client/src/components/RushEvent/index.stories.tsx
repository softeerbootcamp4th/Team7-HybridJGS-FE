import type { Meta, StoryFn } from "@storybook/react";
import { rushEventData } from "@/features/Main/Rush.tsx";
import { formatDate } from "@/utils/formatDate.ts";
import RushEvent from "./index";

const meta: Meta<typeof RushEvent> = {
    title: "RushEvent",
    component: RushEvent,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        date: { control: "text", description: "선착순 이벤트 날짜" },
        image: { control: "text", description: "선착순 이벤트 경품 이미지" },
        prizeName: { control: "text", description: "선착순 이벤트 경품 이름" },
    },
};

export default meta;

export const AllPrizes: StoryFn<typeof RushEvent> = () => (
    <>
        {rushEventData.map((event) => (
            <RushEvent
                key={event.id}
                id={event.id}
                date={formatDate(event.date)}
                image={event.image}
                prizeName={event.prizeName}
            />
        ))}
    </>
);

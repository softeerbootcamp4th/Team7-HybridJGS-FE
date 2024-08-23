import type { Meta, StoryFn } from "@storybook/react";
import { LOTTERY_EVENT_DATA } from "@/constants/Main/lotteryEventData.ts";
import LotteryEvent, { LotteryEventProps } from "./index";

const meta: Meta<typeof LotteryEvent> = {
    title: "LotteryEvent",
    component: LotteryEvent,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        rank: { control: "number", description: "추첨 이벤트 등수" },
        image: { control: "text", description: "추첨 이벤트 경품 이미지" },
        prizeName: { control: "text", description: "추첨 이벤트 경품 이름" },
        winnerCount: { control: "number", description: "추첨 이벤트 경품 당첨 인원 수" },
    },
};

export default meta;

const Template: StoryFn<typeof LotteryEvent> = (args: LotteryEventProps) => (
    <LotteryEvent {...args} />
);

export const FirstPrize = Template.bind({});
FirstPrize.args = LOTTERY_EVENT_DATA[0];

export const SecondPrize = Template.bind({});
SecondPrize.args = LOTTERY_EVENT_DATA[1];

export const ThirdPrize = Template.bind({});
ThirdPrize.args = LOTTERY_EVENT_DATA[2];

export const FourthPrize = Template.bind({});
FourthPrize.args = LOTTERY_EVENT_DATA[3];

export const FifthPrize = Template.bind({});
FifthPrize.args = LOTTERY_EVENT_DATA[4];

export const AllPrizes: StoryFn<typeof LotteryEvent> = () => (
    <>
        {LOTTERY_EVENT_DATA.map((event) => (
            <LotteryEvent
                key={event.rank}
                rank={event.rank}
                image={event.image}
                prizeName={event.prizeName}
                winnerCount={event.winnerCount}
            />
        ))}
    </>
);

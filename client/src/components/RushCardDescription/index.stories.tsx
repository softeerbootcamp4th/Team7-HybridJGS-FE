import { Meta, StoryFn } from "@storybook/react";
import RushCardDescription from "@/components/RushCardDescription";
import { CARD_COLOR, CARD_DAYS, CARD_SELECTED_STATUS, CARD_TYPE } from "@/constants/Rush/rushCard";

export default {
    title: "Components/RushCardDescription",
    component: RushCardDescription,
    argTypes: {
        color: {
            control: { type: "select" },
            options: Object.values(CARD_COLOR),
            description: "The background color of the card",
            table: {
                type: { summary: "CARD_COLOR" },
                defaultValue: { summary: CARD_COLOR.GREEN },
            },
        },
        day: {
            control: { type: "select" },
            options: Object.values(CARD_DAYS),
            description: "The current day for selecting the card details",
            table: {
                type: { summary: "CARD_DAYS" },
                defaultValue: { summary: CARD_DAYS.DAY1 },
            },
        },
        cardType: {
            control: { type: "select" },
            options: Object.values(CARD_TYPE),
            description: "두 개의 카드 중 하나",
            table: {
                type: { summary: "CARD_TYPE" },
                defaultValue: { summary: CARD_TYPE.FIRST_CARD },
            },
        },
        cardStatus: {
            control: { type: "select" },
            options: Object.values(CARD_SELECTED_STATUS),
            description: "The selection status of the card",
            table: {
                type: { summary: "CARD_SELECTED_STATUS" },
                defaultValue: { summary: CARD_SELECTED_STATUS.FALSE },
            },
        },
    },
} as Meta;

const Template: StoryFn<typeof RushCardDescription> = (args) => <RushCardDescription {...args} />;

export const Default = Template.bind({});
Default.args = {
    color: CARD_COLOR.GREEN,
    day: CARD_DAYS.DAY5,
    cardType: CARD_TYPE.FIRST_CARD,
    cardStatus: CARD_SELECTED_STATUS.TRUE,
};

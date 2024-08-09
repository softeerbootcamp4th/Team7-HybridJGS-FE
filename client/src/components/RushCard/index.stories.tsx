import { Meta, StoryFn } from "@storybook/react";
import RushCard from "@/components/RushCard";
import { CARD_COLOR } from "@/constants/Rush/rushCard";

export default {
    title: "Components/RushCard",
    component: RushCard,
    argTypes: {
        color: {
            control: { type: "select" },
            options: Object.values(CARD_COLOR),
            description: "The background gradient color of the card",
            table: {
                type: { summary: "CARD_COLOR" },
                defaultValue: { summary: CARD_COLOR.GREEN },
            },
        },
        title: {
            control: { type: "text" },
            description: "The title displayed on the card",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Card Title" },
            },
        },
        description: {
            control: { type: "array" },
            description: "An array of descriptions displayed on the card",
            table: {
                type: { summary: "ReactNode[]" },
                defaultValue: { summary: [] },
            },
        },
    },
} as Meta;

const Template: StoryFn<typeof RushCard> = (args) => <RushCard {...args} />;

export const BlueCard = Template.bind({});
BlueCard.args = {
    color: CARD_COLOR.BLUE,
    title: "Blue Card",
    description: ["This is a blue card", "It has a gradient background"],
};

export const RedCard = Template.bind({});
RedCard.args = {
    color: CARD_COLOR.RED,
    title: "Red Card",
    description: ["This is a red card", "It has a gradient background"],
};

export const YellowCard = Template.bind({});
YellowCard.args = {
    color: CARD_COLOR.YELLOW,
    title: "Yellow Card",
    description: ["This is a yellow card", "It has a gradient background"],
};

export const GreenCard = Template.bind({});
GreenCard.args = {
    color: CARD_COLOR.GREEN,
    title: "Green Card",
    description: ["This is a green card", "It has a gradient background"],
};

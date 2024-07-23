import type { Meta, StoryObj } from "@storybook/react";
import Notice from "./index.tsx";

const meta: Meta<typeof Notice> = {
    title: "Notice",
    component: Notice,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

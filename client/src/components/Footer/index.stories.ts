import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./index.tsx";

const meta: Meta<typeof Footer> = {
    title: "Footer",
    component: Footer,
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

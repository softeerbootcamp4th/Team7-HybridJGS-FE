import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./index.tsx";

const meta: Meta<typeof Toast> = {
    title: "Toast",
    component: Toast,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

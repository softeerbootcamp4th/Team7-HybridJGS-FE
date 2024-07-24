import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta = {
    title: "Header",
    component: Component,
    tags: ["autodocs"],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
};

import type { Meta } from "@storybook/react";
import Component, { ToggleProps } from "./index";

const meta = {
    title: "Toggle",
    component: Component,
    tags: ["autodocs"],
    argTypes: {},
} as Meta;

export default meta;

const Toggle = (args: ToggleProps) => {
    return <Component {...args} />;
};

export const Default = (args: ToggleProps) => (
    <Toggle {...args} leftText="Now" rightText="Before" />
);

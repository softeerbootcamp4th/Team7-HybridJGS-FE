import type { Meta } from "@storybook/react";
import Component, { HeaderProps } from "./index";

const meta = {
    title: "Header",
    component: Component,
    tags: ["autodocs"],
} as Meta;

export default meta;

const Header = (args: HeaderProps) => {
    return <Component {...args} />;
};

export const Light = (args: HeaderProps) => <Header {...args} type="light" />;

export const Dark = (args: HeaderProps) => <Header {...args} type="dark" />;

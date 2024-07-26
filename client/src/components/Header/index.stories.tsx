import type { Meta } from "@storybook/react";
import Component, { HeaderProps } from "./index";

const meta = {
    title: "Header",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        type: { description: "라이트모드 / 다크모드" },
    },
} as Meta;

export default meta;

const Header = (args: HeaderProps) => {
    return <Component {...args} />;
};

export const Light = (args: HeaderProps) => <Header {...args} type="light" />;

export const Dark = (args: HeaderProps) => <Header {...args} type="dark" />;

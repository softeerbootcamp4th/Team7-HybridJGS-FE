import type { Meta } from "@storybook/react";
import Component, { ButtonHeaderProps } from "./index";

const meta = {
    title: "ButtonHeader",
    component: Component,
    tags: ["autodocs"],
} as Meta;

export default meta;

const ButtonHeader = (args: ButtonHeaderProps) => {
    return <Component {...args} />;
};

export const LightSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected type="light" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const LightUnSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected={false} type="light" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const DarkSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected type="dark" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const DarkUnSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected={false} type="dark" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

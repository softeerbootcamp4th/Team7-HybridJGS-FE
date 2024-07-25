import type { Meta, StoryFn } from "@storybook/react";
import Component, { ButtonProps } from "./index.tsx";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Component,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        label: { description: "버튼 텍스트", control: "text" },
        onClick: { description: "버튼 클릭 함수" },
        color: {
            description: "버튼 색상",
            options: ["blue", "white"],
            control: { type: "select" },
        },
        disabled: { description: "버튼 활성 상태", control: "boolean" },
    },
};

export default meta;

const Button: StoryFn<typeof Component> = (args: ButtonProps) => {
    return <Component {...args} />;
};

export const EnabledBlue: StoryFn<typeof Component> = (args: ButtonProps) => (
    <Button {...args} label="다음" onClick={() => {}} color="blue" disabled={false} />
);

export const EnabledWhite: StoryFn<typeof Component> = (args: ButtonProps) => (
    <Button {...args} label="다음" onClick={() => {}} color="white" disabled={false} />
);

export const Disabled: StoryFn<typeof Component> = (args: ButtonProps) => (
    <Button {...args} label="다음" onClick={() => {}} disabled={true} />
);

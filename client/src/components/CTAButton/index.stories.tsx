import type { Meta, StoryFn } from "@storybook/react";
import Component, { CTAButtonProps } from "./index.tsx";

const meta: Meta<typeof Component> = {
    title: "CTAButton",
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
        hasIcon: { description: "아이콘 유무", control: "boolean" },
    },
};

export default meta;

const CTAButton: StoryFn<typeof Component> = (args: CTAButtonProps) => {
    return <Component {...args} />;
};

export const EnabledBlue: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton
        {...args}
        label="이벤트 참여하기"
        onClick={() => {}}
        color="blue"
        disabled={false}
        hasIcon={true}
    />
);

export const EnabledWhite: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton
        {...args}
        label="다음"
        onClick={() => {}}
        color="white"
        disabled={false}
        hasIcon={true}
    />
);

export const Disabled: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton {...args} label="다음" onClick={() => {}} disabled={true} hasIcon={true} />
);

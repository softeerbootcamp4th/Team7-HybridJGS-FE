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
        disabled: { description: "버튼 활성 상태", control: "boolean" },
        color: {
            description: "버튼 색상",
            options: ["blue", "white"],
            control: { type: "select" },
        },
        url: { description: "이동 경로 url", control: "text" },
        hasArrowIcon: { description: "화살표 아이콘 유무", control: "boolean" },
        hasShareIcon: { description: "공유 아이콘 유무", control: "boolean" },
    },
};

export default meta;

const CTAButton: StoryFn<typeof Component> = (args: CTAButtonProps) => {
    return <Component {...args} />;
};

export const EnabledBlue: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton
        {...args}
        label="더 알아보러 가기"
        color="blue"
        disabled={false}
        hasShareIcon={true}
        url="https://casper.hyundai.com/vehicles/electric/highlight"
    />
);

export const EnabledWhite: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton {...args} label="다음" color="white" disabled={false} hasArrowIcon={true} url="/" />
);

export const Disabled: StoryFn<typeof Component> = (args: CTAButtonProps) => (
    <CTAButton {...args} label="다음" disabled={true} hasArrowIcon={true} hasShareIcon={true} />
);

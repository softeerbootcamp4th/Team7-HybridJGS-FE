import type { Meta } from "@storybook/react";
import Component, { ScrollProps } from "./index";

const meta = {
    title: "Scroll",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        type: { description: "Scroll 색상 타입" },
        children: { description: "Scroll에 들어갈 텍스트" },
    },
} as Meta;

export default meta;

const Scroll = (args: ScrollProps) => {
    return <Component {...args} />;
};

export const Light = (args: ScrollProps) => (
    <Scroll {...args} type="light">
        <span className="h-body-2-regular">
            이벤트에 대해 궁금하다면 <span className="h-body-2-bold">스크롤</span>해 보세요
        </span>
    </Scroll>
);

export const Dark = (args: ScrollProps) => (
    <Scroll {...args} type="dark">
        <span className="h-body-2-regular">
            이벤트에 대해 궁금하다면 <span className="h-body-2-bold">스크롤</span>해 보세요
        </span>
    </Scroll>
);

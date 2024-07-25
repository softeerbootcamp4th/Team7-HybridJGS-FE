import type { Meta } from "@storybook/react";
import Component, { KeywordProps } from "./index";

const meta = {
    title: "Keyword",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        children: { description: "Keyword에 들어갈 텍스트" },
    },
} as Meta;

export default meta;

const Keyword = (args: KeywordProps) => {
    return <Component {...args} />;
};

export const Default = (args: KeywordProps) => (
    <Keyword {...args}>CASPER Electric 출시 기념 이벤트</Keyword>
);

import type { Meta } from "@storybook/react";
import Component, { CategoryProps } from "./index";

const meta = {
    title: "Category",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        type: { description: "Category 유형" },
        children: { description: "Category에 들어갈 텍스트" },
    },
} as Meta;

export default meta;

const Category = (args: CategoryProps) => {
    return <Component {...args} />;
};

export const Basic = (args: CategoryProps) => (
    <Category {...args} type="basic">
        Basic
    </Category>
);

export const Limited = (args: CategoryProps) => (
    <Category {...args} type="limited">
        CASPER Electric Limited
    </Category>
);

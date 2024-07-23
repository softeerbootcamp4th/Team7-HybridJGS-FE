import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { ToggleProps } from "./index";

const meta = {
    title: "Toggle",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        leftText: {
            description: "toggle의 왼쪽 칸에 들어갈 텍스트",
        },
        rightText: {
            description: "toggle의 오른쪽 칸에 들어갈 텍스트",
        },
        isLeftSelected: {
            description: "toggle의 왼쪽 칸 선택 여부",
        },
        handleToggle: {
            description: "toggle trigger",
        },
    },
} as Meta;

export default meta;

const Toggle = (args: ToggleProps) => {
    const [isLeftSelected, setIsLeftSelected] = useState(args.isLeftSelected);

    const handleToggle = () => {
        setIsLeftSelected((prevIsSelected) => !prevIsSelected);
    };

    return <Component {...args} isLeftSelected={isLeftSelected} handleToggle={handleToggle} />;
};

export const Default = (args: ToggleProps) => (
    <Toggle {...args} leftText="Now" rightText="Before" isLeftSelected={true} />
);

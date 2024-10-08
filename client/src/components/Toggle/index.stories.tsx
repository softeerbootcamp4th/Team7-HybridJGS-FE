import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { ToggleProps } from "./index";

const meta = {
    title: "Toggle",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        options: {
            description: "toggle 될 옵션들",
        },
        selectedIdx: {
            description: "선택된 옵션의 index",
        },
        handleToggle: {
            description: "toggle trigger",
        },
    },
} as Meta;

export default meta;

const Toggle = (args: ToggleProps) => {
    const [selectedIdx, setSelectedIdx] = useState(args.selectedIdx);

    const handleToggle = (idx: number) => {
        setSelectedIdx(idx);
    };

    return <Component {...args} selectedIdx={selectedIdx} handleToggle={handleToggle} />;
};

export const Default = (args: ToggleProps) => (
    <Toggle
        {...args}
        options={[
            "혜택이 늘어요",
            "충전소가 늘어요",
            "유지비가 줄어요",
            "환경오염이 줄어요",
            "소음이 줄어요",
        ]}
    />
);

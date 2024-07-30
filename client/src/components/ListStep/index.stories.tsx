import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { ListStepProps } from "./index.tsx";

const meta = {
    title: "ListStep",
    component: Component,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        options: { description: "list step 선택지" },
        selectedIdx: { description: "선택된 옵션 index" },
        handleClickOption: { description: "옵션 변경 이벤트" },
    },
} as Meta;

export default meta;

const ListStep = (args: ListStepProps) => {
    const [selectedIdx, setSelectedIdx] = useState(args.selectedIdx);

    const handleOptionClick = (idx: number) => {
        setSelectedIdx(idx);
    };

    return <Component {...args} selectedIdx={selectedIdx} handleClickOption={handleOptionClick} />;
};

export const Default = (args: ListStepProps) => (
    <ListStep {...args} options={["눈", "입", "색상", "스티커"]} selectedIdx={0} />
);

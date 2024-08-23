import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { InputProps } from "./index";

const meta = {
    title: "Input",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        type: { description: "Input 색상 타입" },
        label: { description: "Input label에 들어갈 텍스트" },
        placeholder: { description: "Input placeholder" },
        value: { description: "Input 텍스트" },
        handleValueChange: { description: "Input 텍스트 변경 이벤트" },
    },
} as Meta;

export default meta;

const Input = (args: InputProps) => {
    const [value, setValue] = useState(args.value);

    const handleValueChange = (val: string) => {
        setValue(val);
    };

    return <Component {...args} value={value} handleValueChange={handleValueChange} />;
};

export const Light = (args: InputProps) => (
    <Input {...args} type="light" label="전화번호" placeholder="010-xxxx-xxxx" />
);

export const Dark = (args: InputProps) => (
    <Input {...args} type="dark" label="전화번호" placeholder="010-xxxx-xxxx" />
);

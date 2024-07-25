import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { TextFieldProps } from "./index";

const meta = {
    title: "TextField",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        label: { description: "TextField label에 들어갈 텍스트" },
        isRequired: { description: "텍스트 필수 여부" },
        size: { description: "TextField 크기" },
        placeholder: { description: "TextField placeholder" },
        limit: { description: "TextField 글자 제한" },
        value: { description: "TextField 텍스트" },
        handleValueChange: { description: "TextField 텍스트 변경 이벤트" },
    },
} as Meta;

export default meta;

const TextField = (args: TextFieldProps) => {
    const [value, setValue] = useState(args.value);

    const handleValueChange = (val: string) => {
        setValue(val);
    };

    return <Component {...args} value={value} handleValueChange={handleValueChange} />;
};

export const Required = (args: TextFieldProps) => (
    <TextField
        {...args}
        isRequired
        label="캐스퍼 일렉트릭 봇의 이름을 지어주세요!"
        placeholder="주캐스퍼"
        size="sm"
        limit={10}
    />
);

export const Selective = (args: TextFieldProps) => (
    <TextField
        {...args}
        label="캐스퍼 일렉트릭과 함께 하고 싶은 일이 있나요?"
        placeholder="기대평을 작성해주세요 (선택)"
        size="lg"
        limit={60}
    />
);

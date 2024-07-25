import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { CheckBoxProps } from "./index";

const meta = {
    title: "CheckBox",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        isChecked: { control: "boolean" },
    },
} as Meta;

export default meta;

const CheckBox = (args: CheckBoxProps) => {
    const [isChecked, setIsChecked] = useState(args.isChecked);

    const handleChangeCheck = (val: boolean) => {
        setIsChecked(val);
    };

    return <Component {...args} isChecked={isChecked} handleChangeCheck={handleChangeCheck} />;
};

export const Checked = (args: CheckBoxProps) => <CheckBox {...args} isChecked />;

export const UnChecked = (args: CheckBoxProps) => <CheckBox {...args} isChecked={false} />;

export const CheckedLabel = (args: CheckBoxProps) => (
    <CheckBox {...args} isChecked label="개인정보 수집 및 활용 동의" />
);

export const UnCheckedLabel = (args: CheckBoxProps) => (
    <CheckBox {...args} isChecked={false} label="마케팅 정보 수신 동의" />
);

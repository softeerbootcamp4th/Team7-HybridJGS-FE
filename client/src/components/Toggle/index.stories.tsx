import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { ToggleProps } from "./index";

const meta = {
    title: "Toggle",
    component: Component,
    tags: ["autodocs"],
    argTypes: {},
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

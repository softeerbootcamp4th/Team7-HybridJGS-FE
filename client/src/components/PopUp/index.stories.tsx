import { useState } from "react";
import type { Meta } from "@storybook/react";
import Component, { PopUpProps } from "./index";

const meta = {
    title: "PopUp",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        phoneNumber: { description: "Input 색상 타입" },
        handlePhoneNumberChange: { description: "phone number가 변경되는 이벤트 핸들러" },
        handleClose: { description: "popup close 이벤트 핸들러" },
    },
} as Meta;

export default meta;

const PopUp = (args: PopUpProps) => {
    const [phoneNumber, setPhoneNumber] = useState(args.phoneNumber);

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumber(val);
    };

    return (
        <Component
            {...args}
            phoneNumber={phoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleClose={() => {}}
        />
    );
};

export const Default = (args: PopUpProps) => (
    <>
        <PopUp {...args} />
    </>
);

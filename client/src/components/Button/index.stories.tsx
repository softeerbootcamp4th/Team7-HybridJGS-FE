import type { Meta, StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "./index.tsx";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        label: { description: "버튼 텍스트", control: "text" },
        onClick: { description: "버튼 클릭 함수" },
    },
};

export default meta;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "다시 만들기",
    onClick: () => {},
};

import type { Meta } from "@storybook/react";
import Component, { ButtonHeaderProps } from "./index";

const meta = {
    title: "ButtonHeader",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        type: { description: "라이트모드 / 다크모드" },
        isSelected: { description: "해당 버튼 헤더 선택 여부" },
        url: { description: "버튼 헤더 클릭 시 이동하는 URL" },
        children: { description: "버튼 헤더 내부에 들어가는 Node" },
    },
} as Meta;

export default meta;

const ButtonHeader = (args: ButtonHeaderProps) => {
    return <Component {...args} />;
};

export const LightSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected type="light" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const LightUnSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected={false} type="light" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const DarkSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected type="dark" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

export const DarkUnSelected = (args: ButtonHeaderProps) => (
    <ButtonHeader {...args} isSelected={false} type="dark" url="/">
        선착순 밸런스 게임
    </ButtonHeader>
);

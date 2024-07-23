import type { Meta } from "@storybook/react";
import Component, { TooltipProps } from "./index";

const meta = {
    title: "Tooltip",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        content: { control: "text" },
    },
} as Meta;

export default meta;

const Tooltip = (args: TooltipProps) => {
    return <Component {...args} />;
};

export const Default = (args: TooltipProps) => (
    <div className="absolute left-40 top-40">
        <Tooltip
            {...args}
            isVisible
            positionPercent="30%"
            content={
                <>
                    뱃지 만들고 친구에게 공유하면 당첨 확률 UP!
                    <br />
                    누구보다 빨리 CASPER Electric 받아가자!
                </>
            }
        >
            Tooltip
        </Tooltip>
    </div>
);

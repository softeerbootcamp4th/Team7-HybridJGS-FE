import type { Meta } from "@storybook/react";
import Component, { TooltipProps } from "./index";

const meta = {
    title: "Tooltip",
    component: Component,
    tags: ["autodocs"],
    argTypes: {
        content: { description: "툴팁 내부에 들어가는 내용", control: "text" },
        positionPercent: { description: "툴팁 위치 (%)", control: "text" },
        children: { description: "툴팁이 위치할 컴포넌트" },
        isVisible: { description: "툴팁 가시성" },
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
            positionPercent="50%"
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

export const Percent20 = (args: TooltipProps) => (
    <div className="absolute left-40 top-40">
        <Tooltip
            {...args}
            isVisible
            positionPercent="20%"
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

export const Percent80 = (args: TooltipProps) => (
    <div className="absolute left-40 top-40">
        <Tooltip
            {...args}
            isVisible
            positionPercent="80%"
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

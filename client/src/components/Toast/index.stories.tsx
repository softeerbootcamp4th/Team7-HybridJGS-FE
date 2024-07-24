import type { Meta, StoryObj } from "@storybook/react";
import useToast from "../../hooks/useToast.tsx";
import Toast from "./index.tsx";

const meta: Meta<typeof Toast> = {
    title: "Toast",
    component: Toast,
    tags: ["autodocs"],
    argTypes: {
        message: { control: "text", description: "토스트 메시지에 띄을 텍스트" },
        isVisible: {
            control: "boolean",
            description: "현재 화면에 토스트 메시지가 보이는지에 대한 여부",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const { showToast, ToastComponent } = useToast("추첨 이벤트에 응모가 완료되었어요!");

        return (
            <div className="p-4">
                <button onClick={showToast} className="rounded-500 bg-s-blue p-3 text-n-white">
                    Show Toast
                </button>
                {ToastComponent}
            </div>
        );
    },
};

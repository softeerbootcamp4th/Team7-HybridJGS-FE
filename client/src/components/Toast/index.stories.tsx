import type { Meta, StoryObj } from "@storybook/react";
import useToast from "../../hooks/useToast.tsx";
import Toast from "./index.tsx";

const meta: Meta<typeof Toast> = {
    title: "Toast",
    component: Toast,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const { showToast, ToastComponent } = useToast("추첨 이벤트에 응모가 완료되었어요!");

        return (
            <div style={{ padding: "20px" }}>
                <button
                    onClick={showToast}
                    style={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "4px",
                    }}
                >
                    Show Toast
                </button>
                {ToastComponent}
            </div>
        );
    },
};

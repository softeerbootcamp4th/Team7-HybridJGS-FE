import { memo } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
}

function Toast({ message, isVisible }: ToastProps) {
    return (
        <div
            className={`fixed top-[88px] left-[50%] translate-x-[-50%] h-heading-4-bold bg-s-blue text-n-white px-6 py-4 rounded-500 transition-opacity ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {message}
        </div>
    );
}

export default memo(Toast);

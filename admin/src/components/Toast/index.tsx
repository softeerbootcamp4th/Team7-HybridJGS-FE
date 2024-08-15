interface ToastProps {
    message: string;
    isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
    return (
        <div
            className={`fixed top-[88px] left-[50%] translate-x-[-50%] h-heading-4-bold bg-neutral-400 text-white px-6 py-4 rounded-lg transition-opacity ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {message}
        </div>
    );
}

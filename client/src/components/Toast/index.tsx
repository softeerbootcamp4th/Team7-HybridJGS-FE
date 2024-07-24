interface ToastProps {
    message: string;
    isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
    return (
        <div
            className={`fixed bottom-4 right-4 h-heading-4-bold bg-s-blue text-n-white px-6 py-4 rounded-500 transition-opacity ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {message}
        </div>
    );
}

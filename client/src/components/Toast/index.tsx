import { useEffect } from "react";

interface toastProps {
    message: string;
    duration: number;
    onClose: () => void;
}

export default function Toast({ message, duration = 3000, onClose }: toastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    return (
        <div className="fixed h-heading-4-bold bg-s-blue text-n-white px-6 py-4 rounded-500">
            {message}
        </div>
    );
}

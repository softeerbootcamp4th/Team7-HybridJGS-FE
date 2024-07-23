import { useCallback, useEffect, useState } from "react";
import Toast from "../components/Toast";

export default function useToast(message: string, duration: number = 3000) {
    const [visible, setVisible] = useState(false);

    const showToast = useCallback(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible, duration]);

    const ToastComponent = <Toast message={message} isVisible={visible} />;

    return { showToast, ToastComponent };
}

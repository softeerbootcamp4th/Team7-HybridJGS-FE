import { ReactNode, useCallback, useState } from "react";
import Toast from "../components/Toast";

export default function useToast(message: string, duration: number = 3000) {
    const [visible, setVisible] = useState(false);

    const showToast = useCallback(() => {
        setVisible(true);
    }, []);

    const closeToast = useCallback(() => {
        setVisible(false);
    }, []);

    const ToastComponent: ReactNode = visible ? (
        <Toast message={message} duration={duration} onClose={closeToast} />
    ) : null;

    return { showToast, ToastComponent };
}

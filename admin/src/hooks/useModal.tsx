import { useEffect, useState } from "react";
import Modal, { ModalProps } from "@/components/Modal";

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleOpenModal = () => {
        document.body.style.overflow = "hidden";
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        document.body.style.overflow = "unset";
        setIsOpen(false);
    };

    const ModalComponent = ({ children }: Omit<ModalProps, "handleClose">) => {
        return isOpen ? <Modal handleClose={handleCloseModal}>{children}</Modal> : null;
    };

    return { handleOpenModal, ModalComponent };
}

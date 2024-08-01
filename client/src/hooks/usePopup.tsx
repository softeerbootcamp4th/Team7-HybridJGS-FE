import { useEffect, useState } from "react";
import Popup, { PopUpProps } from "@/components/PopUp";

export default function usePopup({
    phoneNumber,
    handlePhoneNumberChange,
    confirmUrl,
}: Omit<PopUpProps, "handleClose">) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleOpenPopup = () => {
        document.body.style.overflow = "hidden";
        setIsVisible(true);
    };

    const handleClosePopup = () => {
        document.body.style.overflow = "unset";
        handlePhoneNumberChange("");
        setIsVisible(false);
    };

    const PopupComponent = isVisible ? (
        <Popup
            phoneNumber={phoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleClose={handleClosePopup}
            confirmUrl={confirmUrl}
        />
    ) : (
        <></>
    );

    return { handleOpenPopup, PopupComponent };
}

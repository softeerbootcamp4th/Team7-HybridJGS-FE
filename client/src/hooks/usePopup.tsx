import { useEffect, useState } from "react";
import Popup, { PopUpProps } from "@/components/PopUp";

export default function usePopup({
    phoneNumber,
    handlePhoneNumberChange,
    confirmUrl,
}: Omit<PopUpProps, "handleClose">) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = "unset";
        }
    }, [isVisible]);

    const handleOpenPopup = () => {
        document.body.style.overflow = "hidden";
        setIsVisible(true);
    };

    const handleClosePopup = () => {
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

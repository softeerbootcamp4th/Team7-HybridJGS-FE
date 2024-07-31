import { useState } from "react";
import Popup, { PopUpProps } from "@/components/PopUp";

export default function usePopup({
    phoneNumber,
    handlePhoneNumberChange,
    confirmUrl,
}: Omit<PopUpProps, "handleClose">) {
    const [isVisible, setIsVisible] = useState(false);

    const handleOpenPopup = () => {
        setIsVisible(true);
    };

    const PopupComponent = isVisible ? (
        <Popup
            phoneNumber={phoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleClose={() => setIsVisible(false)}
            confirmUrl={confirmUrl}
        />
    ) : (
        <></>
    );

    return { handleOpenPopup, PopupComponent };
}

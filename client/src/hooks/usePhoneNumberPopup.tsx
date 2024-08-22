import { useEffect, useState } from "react";
import PhoneNumberPopUp, { PhoneNumberPopUpProps } from "@/components/PhoneNumberPopUp";

export default function usePhoneNumberPopUp({
    phoneNumber,
    handlePhoneNumberChange,
    handlePhoneNumberConfirm,
}: Omit<PhoneNumberPopUpProps, "handleClose">) {
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
        <PhoneNumberPopUp
            phoneNumber={phoneNumber}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handlePhoneNumberConfirm={handlePhoneNumberConfirm}
            handleClose={handleClosePopup}
        />
    ) : (
        <></>
    );

    return { handleOpenPopup, PopupComponent };
}

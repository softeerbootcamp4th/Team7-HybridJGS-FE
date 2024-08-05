import { useContext } from "react";
import { PhoneNumberStateType } from "@/types/phoneNumber";
import { PhoneNumberStateContext } from "../contexts/phoneNumberContext";

export default function usePhoneNumberStateContext(): PhoneNumberStateType {
    const context = useContext(PhoneNumberStateContext);
    if (context === null) {
        throw new Error(
            "phoneNumberStateContext must be used within a usePhoneNumberStateProvider"
        );
    }
    return context;
}

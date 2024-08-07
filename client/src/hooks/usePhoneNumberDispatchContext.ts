import { useContext } from "react";
import { PhoneNumberDispatchType } from "@/types/phoneNumber";
import { PhoneNumberDispatchContext } from "../contexts/phoneNumberContext";

export default function usePhoneNumberDispatchContext(): PhoneNumberDispatchType {
    const context = useContext(PhoneNumberDispatchContext);
    if (context === null) {
        throw new Error(
            "phoneNumberDispatchContext must be used within a usePhoneNumberDispatchProvider"
        );
    }
    return context;
}

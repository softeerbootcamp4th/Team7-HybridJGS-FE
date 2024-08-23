import { useContext } from "react";
import { PhoneNumberDispatchType } from "@/types/phoneNumber.ts";
import { PhoneNumberDispatchContext } from "../../contexts/phoneNumberContext.tsx";

export default function usePhoneNumberDispatchContext(): PhoneNumberDispatchType {
    const context = useContext(PhoneNumberDispatchContext);
    if (context === null) {
        throw new Error(
            "phoneNumberDispatchContext must be used within a usePhoneNumberDispatchProvider"
        );
    }
    return context;
}

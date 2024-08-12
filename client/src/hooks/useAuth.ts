import { useState } from "react";
import { useCookies } from "react-cookie";
import { AuthAPI } from "@/apis/authAPI.ts";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token.ts";
import usePhoneNumberDispatchContext from "@/hooks/usePhoneNumberDispatchContext.ts";
import usePhoneNumberStateContext from "@/hooks/usePhoneNumberStateContext.ts";
import usePopup from "@/hooks/usePopup.tsx";
import useToast from "@/hooks/useToast.tsx";
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

interface UseAuthProps {
    eventStartDate: string;
    eventEndDate: string;
    confirmUrl: string;
}

export default function useAuth({ eventStartDate, eventEndDate, confirmUrl }: UseAuthProps) {
    const [_cookies, setCookie] = useCookies([COOKIE_TOKEN_KEY]);

    const { phoneNumber } = usePhoneNumberStateContext();
    const dispatch = usePhoneNumberDispatchContext();

    const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumberState(val);
    };

    const handlePhoneNumberConfirm = async (val: string) => {
        const data = await AuthAPI.getAuthToken({ phoneNumber: val });

        setCookie(COOKIE_TOKEN_KEY, data.accessToken);
        dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: val });
    };

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber: phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
        confirmUrl,
    });
    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    const handleClickShortCut = () => {
        const startDate = getMsTime(eventStartDate);
        const endDate = getMsTime(eventEndDate);
        const currentDate = new Date().getTime();

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    };

    return {
        handleClickShortCut,
        PopupComponent,
        ToastComponent,
    };
}

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthAPI } from "@/apis/authAPI";
import { COOKIE_KEY } from "@/constants/cookie";
import usePhoneNumberDispatchContext from "@/hooks/Contexts/usePhoneNumberDispatchContext.ts";
import usePhoneNumberStateContext from "@/hooks/Contexts/usePhoneNumberStateContext.ts";
import useFetch from "@/hooks/useFetch";
import { PostAuthResponse } from "@/types/authApi";
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber";

export function useAuth(redirectUrl: string) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inviteUser = queryParams.get(COOKIE_KEY.INVITE_USER);

    const [_cookies, setCookie] = useCookies([COOKIE_KEY.ACCESS_TOKEN, COOKIE_KEY.INVITE_USER]);

    const {
        data: authToken,
        isSuccess: isSuccessGetAuthToken,
        fetchData: getAuthToken,
    } = useFetch<PostAuthResponse, string>((val: string) =>
        AuthAPI.getAuthToken({ phoneNumber: val })
    );

    const { phoneNumber } = usePhoneNumberStateContext();
    const dispatch = usePhoneNumberDispatchContext();

    const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

    useEffect(() => {
        if (inviteUser) {
            setCookie(COOKIE_KEY.INVITE_USER, inviteUser, { path: "/" });
        }
    }, [inviteUser]);

    useEffect(() => {
        if (authToken && isSuccessGetAuthToken) {
            setCookie(COOKIE_KEY.ACCESS_TOKEN, authToken.accessToken, { path: "/" });
            dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: phoneNumberState });
            navigate(redirectUrl);
        }
    }, [authToken, isSuccessGetAuthToken]);

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumberState(val);
    };

    const handlePhoneNumberConfirm = async (val: string) => {
        await getAuthToken(val);
    };

    return {
        phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
    };
}

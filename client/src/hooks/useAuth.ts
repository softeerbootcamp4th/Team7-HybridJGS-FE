// import { useCallback, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
// import { AuthAPI } from "@/apis/authAPI.ts";
// import { COOKIE_KEY } from "@/constants/cookie.ts";
// import useFetch from "@/hooks/useFetch.ts";
// import usePhoneNumberDispatchContext from "@/hooks/usePhoneNumberDispatchContext.ts";
// import usePhoneNumberStateContext from "@/hooks/usePhoneNumberStateContext.ts";
// import usePopup from "@/hooks/usePopup.tsx";
// import useToast from "@/hooks/useToast.tsx";
// import { PostAuthResponse } from "@/types/authApi.ts";
// import { GetLotteryResponse } from "@/types/lotteryApi.ts";
// import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber.ts";
// import { getMsTime } from "@/utils/getMsTime.ts";
//
// interface UseAuthProps {
//     eventStartDate: string;
//     eventEndDate: string;
//     confirmUrl: string;
// }
//
// export default function useAuth({ eventStartDate, eventEndDate, confirmUrl, data }: UseAuthProps) {
//     const [_cookies, setCookie] = useCookies([COOKIE_KEY.ACCESS_TOKEN, COOKIE_KEY.INVITE_USER]);
//
//     const navigate = useNavigate();
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const inviteUser = queryParams.get(COOKIE_KEY.INVITE_USER);
//
//     const {
//         data: authToken,
//         isSuccess: isSuccessGetAuthToken,
//         fetchData: getAuthToken,
//     } = useFetch<PostAuthResponse, string>((val: string) =>
//         AuthAPI.getAuthToken({ phoneNumber: val })
//     );
//
//     const { phoneNumber } = usePhoneNumberStateContext();
//     const dispatch = usePhoneNumberDispatchContext();
//
//     const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);
//
//     useEffect(() => {
//         if (inviteUser) {
//             setCookie(COOKIE_KEY.INVITE_USER, inviteUser);
//         }
//     }, [inviteUser]);
//
//     useEffect(() => {
//         if (authToken && isSuccessGetAuthToken) {
//             setCookie(COOKIE_KEY.ACCESS_TOKEN, authToken.accessToken);
//             dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: phoneNumberState });
//             navigate(confirmUrl);
//         }
//     }, [authToken, isSuccessGetAuthToken]);
//
//     const handlePhoneNumberChange = (val: string) => {
//         setPhoneNumberState(val);
//     };
//
//     const handlePhoneNumberConfirm = async (val: string) => {
//         const data = await AuthAPI.getAuthToken({ phoneNumber: val });
//
//         setCookie(COOKIE_KEY.ACCESS_TOKEN, data.accessToken, { path: "/" });
//         dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: val });
//     };
//
//     const { handleOpenPopup, PopupComponent } = usePopup({
//         phoneNumber: phoneNumberState,
//         handlePhoneNumberChange,
//         handlePhoneNumberConfirm,
//     });
//     const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");
//
//     const handleClickShortCut = useCallback(() => {
//         const startDate = getMsTime(eventStartDate);
//         const endDate = getMsTime(eventEndDate);
//         const currentDate = new Date().getTime();
//
//         const isEventPeriod = currentDate >= startDate && currentDate <= endDate;
//
//         if (isEventPeriod) {
//             handleOpenPopup();
//         } else {
//             showToast();
//         }
//     }, [data]);
//
//     return {
//         handleClickShortCut,
//         PopupComponent,
//         ToastComponent,
//     };
// }

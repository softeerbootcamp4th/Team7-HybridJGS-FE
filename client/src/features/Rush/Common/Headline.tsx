import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthAPI } from "@/apis/authAPI.ts";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useFetch from "@/hooks/useFetch.ts";
import usePhoneNumberDispatchContext from "@/hooks/usePhoneNumberDispatchContext.ts";
import usePhoneNumberStateContext from "@/hooks/usePhoneNumberStateContext.ts";
import usePopup from "@/hooks/usePopup.tsx";
import useToast from "@/hooks/useToast.tsx";
import { PostAuthResponse } from "@/types/authApi.ts";
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber.ts";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { SectionKeyProps } from "@/types/sections.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

export function Headline({ id }: SectionKeyProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inviteUser = queryParams.get(COOKIE_KEY.INVITE_USER);

    const rushData = useLoaderData() as GetTotalRushEventsResponse;

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
            setCookie(COOKIE_KEY.INVITE_USER, inviteUser);
        }
    }, [inviteUser]);

    useEffect(() => {
        if (authToken && isSuccessGetAuthToken) {
            setCookie(COOKIE_KEY.ACCESS_TOKEN, authToken.accessToken);
            dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: phoneNumberState });
            navigate("/rush/game");
        }
    }, [authToken, isSuccessGetAuthToken]);

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumberState(val);
    };

    const handlePhoneNumberConfirm = async (val: string) => {
        await getAuthToken(val);
    };

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber: phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
    });

    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    const handleClickShortCut = useCallback(() => {
        // TODO: 당일 이벤트 종료 시 참여 여부를 기준으로 분기 처리 (T: FinalResult() / F: 이벤트 참여 기간 아님)
        const startDate = getMsTime(rushData.eventStartDate);
        const endDate = getMsTime(rushData.eventEndDate);
        const currentDate = new Date().getTime();

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    }, [rushData]);

    return (
        <section
            id={id}
            className="h-screen bg-[url('/assets/rush/two-car.jpg')] bg-no-repeat bg-cover flex flex-col gap-14 justify-center items-center snap-start"
        >
            <motion.div className="flex flex-col items-center gap-400" {...SCROLL_MOTION(ASCEND)}>
                <p className="h-body-1-regular text-n-black">Event 2. 선착순 이벤트</p>
                <h2 className="h-heading-2-bold text-n-black text-center">
                    캐스퍼 일렉트릭 선착순 밸런스 게임
                    <br />
                    참여하고 선물 받아가세요!
                </h2>
            </motion.div>

            <motion.div className="mt-[20px]" {...SCROLL_MOTION(ASCEND)}>
                <CTAButton
                    label="선착순 밸런스 게임 하러 가기"
                    hasArrowIcon
                    onClick={handleClickShortCut}
                />
            </motion.div>

            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="dark">
                    <p className="h-body-2-bold">스크롤</p>
                    <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
                </Scroll>
            </motion.div>

            {PopupComponent}
            {ToastComponent}
        </section>
    );
}

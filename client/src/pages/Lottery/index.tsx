import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { AuthAPI } from "@/apis/authAPI";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token";
import { LOTTERY_SECTIONS } from "@/constants/PageSections/sections.ts";
import {
    CustomDesign,
    HeadLamp,
    Headline,
    Intro,
    NewColor,
    PixelDesign,
    ShortCut,
    SmileBadge,
    WheelDesign,
} from "@/features/Lottery";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver.ts";
import usePhoneNumberDispatchContext from "@/hooks/usePhoneNumberDispatchContext";
import usePhoneNumberStateContext from "@/hooks/usePhoneNumberStateContext";
import usePopup from "@/hooks/usePopup";
import useScrollTop from "@/hooks/useScrollTop";
import useToast from "@/hooks/useToast";
import { GetLotteryResponse } from "@/types/lotteryApi";
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber";
import { getMsTime } from "@/utils/getMsTime";

export default function Lottery() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [LOTTERY_SECTIONS.HEADLINE, LOTTERY_SECTIONS.SHORT_CUT],
    });

    const [_cookies, setCookie] = useCookies([COOKIE_TOKEN_KEY]);

    const { phoneNumber } = usePhoneNumberStateContext();
    const dispatch = usePhoneNumberDispatchContext();

    const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

    const data = useLoaderData() as GetLotteryResponse;

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
        confirmUrl: `/lottery/custom`,
    });
    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    const handleClickShortCut = () => {
        const startDate = getMsTime(data.startDate);
        const endDate = getMsTime(data.endDate);
        const currentDate = new Date().getTime();

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    };

    return (
        <div ref={containerRef} className="h-screen overflow-x-hidden snap-y snap-mandatory">
            <Headline
                id={LOTTERY_SECTIONS.HEADLINE}
                handleClickShortCutButton={handleClickShortCut}
            />
            <Intro id={LOTTERY_SECTIONS.INTRO} />
            <HeadLamp id={LOTTERY_SECTIONS.HEADLAMP} />
            <PixelDesign id={LOTTERY_SECTIONS.PIXEL_DESIGN} />
            <WheelDesign id={LOTTERY_SECTIONS.WHEEL_DESIGN} />
            <CustomDesign id={LOTTERY_SECTIONS.CUSTOM_DESIGN} />
            <NewColor id={LOTTERY_SECTIONS.NEW_COLOR} />
            <SmileBadge id={LOTTERY_SECTIONS.SMILE_BADGE} />
            <ShortCut
                id={LOTTERY_SECTIONS.SHORT_CUT}
                handleClickShortCutButton={handleClickShortCut}
            />
            <Notice />
            <Footer />

            {PopupComponent}
            {ToastComponent}
        </div>
    );
}

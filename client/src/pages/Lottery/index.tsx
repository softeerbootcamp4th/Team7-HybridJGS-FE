import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLoaderData } from "react-router-dom";
import { AuthAPI } from "@/apis/authAPI";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token";
import CustomDesign from "@/features/Lottery/CustomDesign";
import HeadLamp from "@/features/Lottery/HeadLamp";
import Headline from "@/features/Lottery/Headline";
import Intro from "@/features/Lottery/Intro";
import NewColor from "@/features/Lottery/NewColor";
import PixelDesign from "@/features/Lottery/PixelDesign";
import ShortCut from "@/features/Lottery/ShortCut";
import SmileBadge from "@/features/Lottery/SmileBadge";
import WheelDesign from "@/features/Lottery/WheelDesign";
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

        setCookie(COOKIE_TOKEN_KEY, data.token);
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
        if (data.length === 0) {
            return;
        }

        const currentEvent = data[0];
        const startDate = getMsTime(currentEvent.start_date);
        const endDate = getMsTime(currentEvent.end_date);
        const currentDate = new Date().getTime();

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    };

    return (
        <div className="overflow-x-hidden">
            <Headline handleClickShortCutButton={handleClickShortCut} />
            <Intro />
            <HeadLamp />
            <PixelDesign />
            <WheelDesign />
            <CustomDesign />
            <NewColor />
            <SmileBadge />
            <ShortCut handleClickShortCutButton={handleClickShortCut} />
            <Notice />
            <Footer />

            {PopupComponent}
            {ToastComponent}
        </div>
    );
}

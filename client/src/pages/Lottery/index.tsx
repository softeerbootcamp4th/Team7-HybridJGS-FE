import { useState } from "react";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
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
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber";

export default function Lottery() {
    useScrollTop();

    const { phoneNumber } = usePhoneNumberStateContext();
    const dispatch = usePhoneNumberDispatchContext();

    const [phoneNumberState, setPhoneNumberState] = useState(phoneNumber);

    const handlePhoneNumberChange = (val: string) => {
        setPhoneNumberState(val);
    };

    const handlePhoneNumberConfirm = (val: string) => {
        dispatch({ type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER, payload: val });
    };

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber: phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
        confirmUrl: `/lottery/custom`,
    });
    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    /**
     * TODO: 이벤트 기간 맞는지 확인하는 로직 필요
     */
    const isEventPeriod = true;

    const handleClickShortCut = () => {
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

import { useState } from "react";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { LOTTERY_SECTIONS } from "@/constants/PageSections/sections.ts";
import CustomDesign from "@/features/Lottery/CustomDesign";
import HeadLamp from "@/features/Lottery/HeadLamp";
import Headline from "@/features/Lottery/Headline";
import Intro from "@/features/Lottery/Intro";
import NewColor from "@/features/Lottery/NewColor";
import PixelDesign from "@/features/Lottery/PixelDesign";
import ShortCut from "@/features/Lottery/ShortCut";
import SmileBadge from "@/features/Lottery/SmileBadge";
import WheelDesign from "@/features/Lottery/WheelDesign";
import { useHeaderStyleObserver } from "@/hooks/useHeaderStyleObserver.ts";
import usePhoneNumberDispatchContext from "@/hooks/usePhoneNumberDispatchContext";
import usePhoneNumberStateContext from "@/hooks/usePhoneNumberStateContext";
import usePopup from "@/hooks/usePopup";
import useScrollTop from "@/hooks/useScrollTop";
import useToast from "@/hooks/useToast";
import { PHONE_NUMBER_ACTION } from "@/types/phoneNumber";

export default function Lottery() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [LOTTERY_SECTIONS.HEADLINE, LOTTERY_SECTIONS.SHORT_CUT],
    });

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
        <div ref={containerRef} className="h-screen overflow-auto snap-y snap-mandatory">
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

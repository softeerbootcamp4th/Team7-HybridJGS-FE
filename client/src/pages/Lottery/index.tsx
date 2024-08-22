import { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
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
import { useAuth } from "@/hooks/useAuth.ts";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver.ts";
import usePopup from "@/hooks/usePopup";
import useScrollToTarget from "@/hooks/useScrollToTarget";
import useScrollTop from "@/hooks/useScrollTop";
import useToast from "@/hooks/useToast";
import { GetLotteryResponse } from "@/types/lotteryApi";
import { getMsTime } from "@/utils/getMsTime";

export default function Lottery() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [LOTTERY_SECTIONS.HEADLINE, LOTTERY_SECTIONS.SHORT_CUT],
    });

    const { targetRef, handleScrollToTarget } = useScrollToTarget<HTMLDivElement>();

    const lotteryData = useLoaderData() as GetLotteryResponse;

    const { phoneNumberState, handlePhoneNumberChange, handlePhoneNumberConfirm } =
        useAuth("/lottery/custom");

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber: phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
    });

    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    const handleClickShortCut = useCallback(() => {
        const startDate = getMsTime(lotteryData.eventStartDate);
        const endDate = getMsTime(lotteryData.eventEndDate);
        const currentDate = getMsTime(lotteryData.serverDateTime);

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    }, [lotteryData]);

    return (
        <div ref={containerRef} className="h-screen overflow-x-hidden snap-y snap-mandatory">
            <Headline
                id={LOTTERY_SECTIONS.HEADLINE}
                handleClickShortCutButton={handleClickShortCut}
                handleClickScroll={handleScrollToTarget}
            />
            <Intro ref={targetRef} id={LOTTERY_SECTIONS.INTRO} />
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

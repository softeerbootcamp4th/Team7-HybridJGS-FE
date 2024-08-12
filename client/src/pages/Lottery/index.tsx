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
import useAuth from "@/hooks/useAuth.ts";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver.ts";
import useScrollTop from "@/hooks/useScrollTop";
import { GetLotteryResponse } from "@/types/lotteryApi";

export default function Lottery() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [LOTTERY_SECTIONS.HEADLINE, LOTTERY_SECTIONS.SHORT_CUT],
    });
    const data = useLoaderData() as GetLotteryResponse;

    const { handleClickShortCut, PopupComponent, ToastComponent } = useAuth({
        eventStartDate: data.eventStartDate,
        eventEndDate: data.eventEndDate,
        confirmUrl: "/lottery/custom",
    });

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

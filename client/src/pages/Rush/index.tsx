import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { RUSH_SECTIONS } from "@/constants/PageSections/sections.ts";
import {
    BalanceGame,
    CasperCharge,
    CasperComfortable,
    CasperFar,
    CasperFast,
    CasperSmartKey,
    CasperWide,
    ElectricAdvantage,
    ElectricReason,
    FAQ,
    Intro,
    ReasonFirst,
    ReasonSecond,
} from "@/features/Rush";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver.ts";
import useScrollTop from "@/hooks/useScrollTop.tsx";

export default function Rush() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [RUSH_SECTIONS.INTRO],
    });
    return (
        <div ref={containerRef} className="h-screen overflow-auto snap-y snap-mandatory">
            <BalanceGame id={RUSH_SECTIONS.BALANCE_GAME} />
            <Intro id={RUSH_SECTIONS.INTRO} />
            <FAQ id={RUSH_SECTIONS.FAQ} />
            <ElectricReason id={RUSH_SECTIONS.ELECTRIC_REASON} />
            <ElectricAdvantage id={RUSH_SECTIONS.ELECTRIC_ADVANTAGE} />
            <ReasonFirst id={RUSH_SECTIONS.REASON_FIRST} />
            <CasperFar id={RUSH_SECTIONS.CASPER_FAR} />
            <CasperFast id={RUSH_SECTIONS.CASPER_FAST} />
            <CasperComfortable id={RUSH_SECTIONS.CASPER_COMFORTABLE} />
            <ReasonSecond id={RUSH_SECTIONS.REASON_SECOND} />
            <CasperWide id={RUSH_SECTIONS.CASPER_WIDE} />
            <CasperCharge id={RUSH_SECTIONS.CASPER_CHARGE} />
            <CasperSmartKey id={RUSH_SECTIONS.CASPER_SMART_KEY} />
            <Notice />
            <Footer />
        </div>
    );
}

import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { RUSH_SECTIONS } from "@/constants/PageSections/sections.ts";
import BalanceGame from "@/features/Rush/BalanceGame.tsx";
import CasperCharge from "@/features/Rush/CasperCharge.tsx";
import CasperComfortable from "@/features/Rush/CasperComfortable.tsx";
import CasperFar from "@/features/Rush/CasperFar.tsx";
import CasperFast from "@/features/Rush/CasperFast.tsx";
import CasperSmartKey from "@/features/Rush/CasperSmartKey.tsx";
import CasperWide from "@/features/Rush/CasperWide.tsx";
import ElectricAdvantage from "@/features/Rush/ElectricAdvantage.tsx";
import ElectricReason from "@/features/Rush/ElectricReason.tsx";
import FAQ from "@/features/Rush/FAQ.tsx";
import Intro from "@/features/Rush/Intro.tsx";
import ReasonFirst from "@/features/Rush/ReasonFirst.tsx";
import ReasonSecond from "@/features/Rush/ReasonSecond.tsx";
import { useHeaderStyleObserver } from "@/hooks/useHeaderStyleObserver.ts";
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

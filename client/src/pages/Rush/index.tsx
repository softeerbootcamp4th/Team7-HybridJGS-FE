import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
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
import useScrollTop from "@/hooks/useScrollTop.tsx";

export default function Rush() {
    useScrollTop();
    return (
        <div>
            <BalanceGame />
            <Intro />
            <FAQ />
            <ElectricReason />
            <ElectricAdvantage />
            <ReasonFirst />
            <CasperFar />
            <CasperFast />
            <CasperComfortable />
            <ReasonSecond />
            <CasperWide />
            <CasperCharge />
            <CasperSmartKey />
            <Notice />
            <Footer />
        </div>
    );
}

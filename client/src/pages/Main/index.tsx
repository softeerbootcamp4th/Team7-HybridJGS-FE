import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import { MAIN_SECTIONS } from "@/constants/PageSections/sections.ts";
import Headline from "@/features/Main/Headline.tsx";
import LearnMore from "@/features/Main/LearnMore.tsx";
import Lottery from "@/features/Main/Lottery.tsx";
import Rush from "@/features/Main/Rush.tsx";
import { useHeaderStyleObserver } from "@/hooks/useHeaderStyleObserver.ts";
import useScrollTop from "@/hooks/useScrollTop.tsx";

export default function Main() {
    useScrollTop();
    const containerRef = useHeaderStyleObserver({
        darkSections: [MAIN_SECTIONS.LOTTERY, MAIN_SECTIONS.LEARN_MORE],
    });

    return (
        <div ref={containerRef} className="h-screen overflow-auto snap-y snap-mandatory">
            <Headline id={MAIN_SECTIONS.HEADLINE} />
            <Lottery id={MAIN_SECTIONS.LOTTERY} />
            <Rush id={MAIN_SECTIONS.RUSH} />
            <LearnMore id={MAIN_SECTIONS.LEARN_MORE} />
            <Notice />
            <Footer />
        </div>
    );
}

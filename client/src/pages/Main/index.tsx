import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import Headline from "@/features/Main/Headline.tsx";
import LearnMore from "@/features/Main/LearnMore.tsx";
import Lottery from "@/features/Main/Lottery.tsx";
import Rush from "@/features/Main/Rush.tsx";
import useScrollHeaderStyleContext from "@/hooks/useScrollHeaderStyleContext.ts";
import useScrollTop from "@/hooks/useScrollTop.tsx";
import { SECTIONS, SectionKey } from "@/types/scrollHeaderStyle.ts";

export default function Main() {
    useScrollTop();
    const { sectionRefs, containerRef } = useScrollHeaderStyleContext();

    return (
        <div ref={containerRef} className="h-screen overflow-auto snap-y snap-mandatory">
            <Headline ref={sectionRefs.HEADLINE} sectionId={SECTIONS.HEADLINE as SectionKey} />
            <Lottery ref={sectionRefs.LOTTERY} sectionId={SECTIONS.LOTTERY as SectionKey} />
            <Rush ref={sectionRefs.RUSH} sectionId={SECTIONS.RUSH as SectionKey} />
            <LearnMore ref={sectionRefs.LEARN_MORE} sectionId={SECTIONS.LEARN_MORE as SectionKey} />
            <Notice />
            <Footer />
        </div>
    );
}

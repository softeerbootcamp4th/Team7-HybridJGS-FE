import { useEffect, useRef } from "react";
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
    const { setActiveSection, setHeaderType } = useScrollHeaderStyleContext();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id as SectionKey;
                        setActiveSection(sectionId);
                        if (sectionId === SECTIONS.LOTTERY || sectionId === SECTIONS.LEARN_MORE) {
                            setHeaderType("dark");
                        } else {
                            setHeaderType("light");
                        }
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.5,
            }
        );
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [setActiveSection, setHeaderType]);

    return (
        <div ref={containerRef} className="h-screen overflow-auto snap-y snap-mandatory">
            <Headline id={SECTIONS.HEADLINE} />
            <Lottery id={SECTIONS.LOTTERY} />
            <Rush id={SECTIONS.RUSH} />
            <LearnMore id={SECTIONS.LEARN_MORE} />
            <Notice />
            <Footer />
        </div>
    );
}

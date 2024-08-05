import { ReactNode, RefObject, createContext, useEffect, useMemo, useRef, useState } from "react";
import { SECTIONS, ScrollAnimationType, SectionKey, SectionRefs } from "@/types/scrollAnimation";

export const ScrollAnimationContext = createContext<ScrollAnimationType | null>(null);

export const ScrollAnimationProvider = ({ children }: { children: ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<SectionKey>(SECTIONS.HEADLINE as SectionKey);

    const headlineRef = useRef<HTMLDivElement | null>(null);
    const lotteryRef = useRef<HTMLDivElement | null>(null);
    const rushRef = useRef<HTMLDivElement | null>(null);
    const learnMoreRef = useRef<HTMLDivElement | null>(null);

    const sectionRefs = useMemo<SectionRefs>(
        () =>
            ({
                [SECTIONS.HEADLINE]: headlineRef,
                [SECTIONS.LOTTERY]: lotteryRef,
                [SECTIONS.RUSH]: rushRef,
                [SECTIONS.LEARN_MORE]: learnMoreRef,
            }) as SectionRefs,
        []
    );

    // const sectionKeys = ["Headline", "Lottery", "Rush", "LearnMore"];
    // const sectionRefs: SectionRefs = Object.fromEntries(
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     sectionKeys.map((key) => [key, useRef<HTMLDivElement>(null)])
    // ) as SectionRefs;

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const scrollPosition = container.scrollTop + container.clientHeight / 2;

            for (const [key, ref] of Object.entries(sectionRefs) as [
                SectionKey,
                RefObject<HTMLDivElement>,
            ][]) {
                const section = ref.current;
                if (
                    section &&
                    scrollPosition >= section.offsetTop &&
                    scrollPosition <= section.offsetTop + section.offsetHeight
                ) {
                    setActiveSection(key);
                    console.log(activeSection);
                    break;
                }
            }
        };

        const container = containerRef.current;
        container?.addEventListener("scroll", handleScroll);

        return () => {
            container?.removeEventListener("scroll", handleScroll);
        };
    }, [activeSection, sectionRefs]);

    const scrollToRef = (sectionKey: SectionKey) => {
        const ref = sectionRefs[sectionKey];
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const value = useMemo(
        () => ({
            containerRef,
            sectionRefs,
            scrollToRef,
            activeSection,
            setActiveSection,
        }),
        [sectionRefs, activeSection]
    );

    return (
        <ScrollAnimationContext.Provider value={value}>{children}</ScrollAnimationContext.Provider>
    );
};

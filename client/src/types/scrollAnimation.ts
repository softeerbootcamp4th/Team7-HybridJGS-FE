import { RefObject } from "react";

export const SECTIONS = {
    HEADLINE: "Headline",
    LOTTERY: "Lottery",
    RUSH: "Rush",
    LEARN_MORE: "LearnMore",
} as const;

export type SectionKey = keyof typeof SECTIONS;

export type SectionRefs = {
    [key in SectionKey]: RefObject<HTMLDivElement>;
};

export interface ScrollAnimationType {
    containerRef: RefObject<HTMLDivElement>;
    sectionRefs: SectionRefs;
    scrollToRef: (sectionKey: SectionKey) => void;
    activeSection: SectionKey;
    setActiveSection: (activeSection: SectionKey) => void;
}

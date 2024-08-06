export const SECTIONS = {
    HEADLINE: "HEADLINE",
    LOTTERY: "LOTTERY",
    RUSH: "RUSH",
    LEARN_MORE: "LEARN_MORE",
} as const;

export type SectionKey = keyof typeof SECTIONS;

export type HeaderType = "light" | "dark";

export interface ScrollHeaderStyleType {
    activeSection: SectionKey;
    setActiveSection: (section: SectionKey) => void;
    headerType: HeaderType;
    setHeaderType: (type: HeaderType) => void;
}

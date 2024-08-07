import { SectionKey } from "@/types/sections.ts";

export type HeaderType = "light" | "dark";

export interface ScrollHeaderStyleType {
    activeSection: SectionKey;
    setActiveSection: (section: SectionKey) => void;
    headerType: HeaderType;
    setHeaderType: (type: HeaderType) => void;
}

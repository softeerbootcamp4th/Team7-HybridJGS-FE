import {
    LOTTERY_SECTIONS,
    MAIN_SECTIONS,
    RUSH_SECTIONS,
} from "@/constants/PageSections/sections.ts";

export type MainSectionKey = keyof typeof MAIN_SECTIONS;
export type LotterySectionKey = keyof typeof LOTTERY_SECTIONS;
export type RushSectionKey = keyof typeof RUSH_SECTIONS;

export type SectionKey = MainSectionKey | LotterySectionKey | RushSectionKey;

export type HeaderType = "light" | "dark";

export interface ScrollHeaderStyleType {
    activeSection: SectionKey;
    setActiveSection: (section: SectionKey) => void;
    headerType: HeaderType;
    setHeaderType: (type: HeaderType) => void;
}

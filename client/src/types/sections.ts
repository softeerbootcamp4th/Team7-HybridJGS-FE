import {
    LOTTERY_SECTIONS,
    MAIN_SECTIONS,
    RUSH_SECTIONS,
} from "@/constants/PageSections/sections.ts";

type MainSectionKey = keyof typeof MAIN_SECTIONS;
type LotterySectionKey = keyof typeof LOTTERY_SECTIONS;
type RushSectionKey = keyof typeof RUSH_SECTIONS;

export type SectionKey = MainSectionKey | LotterySectionKey | RushSectionKey;

export interface SectionKeyProps {
    id: SectionKey;
}

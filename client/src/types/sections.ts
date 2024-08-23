import {
    CASPER_CUSTOM_SECTIONS,
    CASPER_SHOWCASE_SECTIONS,
    LOTTERY_SECTIONS,
    MAIN_SECTIONS,
    RUSH_SECTIONS,
} from "@/constants/PageSections/sections.ts";

type MainSectionKey = keyof typeof MAIN_SECTIONS;
type LotterySectionKey = keyof typeof LOTTERY_SECTIONS;
type RushSectionKey = keyof typeof RUSH_SECTIONS;
type CasperCustomSectionKey = keyof typeof CASPER_CUSTOM_SECTIONS;
type CasperShowcaseSectionKey = keyof typeof CASPER_SHOWCASE_SECTIONS;

export type SectionKey =
    | MainSectionKey
    | LotterySectionKey
    | RushSectionKey
    | CasperCustomSectionKey
    | CasperShowcaseSectionKey;

export interface SectionKeyProps {
    id: SectionKey;
}

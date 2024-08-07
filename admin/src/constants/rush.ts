export const RUSH_SECTION = {
    EVENT_LIST: "event_list",
    APPLICANT_LIST: "applicant_list",
    SELECTION_MANAGE: "selection_manage",
    GIFT_MANAGE: "gift_manage",
};
export type RushSectionType = (typeof RUSH_SECTION)[keyof typeof RUSH_SECTION];

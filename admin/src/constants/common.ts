export const enum EVENT_STATUS {
    BEFORE = "BEFORE",
    DURING = "DURING",
    AFTER = "AFTER",
}

export const STATUS_MAP = {
    [EVENT_STATUS.BEFORE]: "오픈 전",
    [EVENT_STATUS.DURING]: "활성화",
    [EVENT_STATUS.AFTER]: "종료",
};

export const ERROR_MAP = {
    CONFLICT: "409",
    NOT_FOUND: "404",
} as const;

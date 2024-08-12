export const EVENT_LIST_HEADER = [
    "ID",
    "이벤트 진행 날짜",
    "오픈 시간",
    "종료 시간",
    "활성화 시간",
    "선택지 관리",
    "경품 관리",
    "선착순 당첨 인원 수",
    "진행 상태",
    "참여자 리스트 보기",
];

export const RUSH_STATUS = {
    BEFORE: "BEFORE",
    DURING: "DURING",
    AFTER: "AFTER",
} as const;

export const RUSH_STATUS_MAP = {
    [RUSH_STATUS.BEFORE]: "오픈 전",
    [RUSH_STATUS.DURING]: "활성화",
    [RUSH_STATUS.AFTER]: "종료",
};

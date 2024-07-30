export const CUSTOM_OPTION = {
    EYES: "eyes",
    EYES_DIRECTION: "eyesDirection",
    MOUTH: "mouth",
    COLOR: "color",
    STICKER: "sticker",
} as const;
const EYES_OPTION = {
    "15INCH_ALLOY": "15inch-alloy",
    "17INCH_ALLOY": "17inch-alloy",
    PIXEL: "pixel",
    ELECTRIC: "electric",
    VACANT: "vacant",
    SMILE: "smile",
    CUTE: "cute",
    HEART: "heart",
};
const POSITION_OPTION = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};
const MOUTH_OPTION = {
    SMILE: "smile",
    CLOUDY: "cloudy",
    MOCKING: "mocking",
    LAUGH: "laugh",
    EXPRESSIONLESS: "expressionless",
};
export const COLOR_OPTION = {
    C_CREAM: "#D8D2BC",
    C_ORANGE: "#CA7349",
    C_KHAKI: "#515868",
    C_SILVER: "#AAAEB1",
    C_BLACK: "#000000",
    R_LIME: "#5CDD6A",
    R_TEAL: "#1CD6BE",
    R_LIGHTBLUE: "#11CCF2",
    R_SKYBLUE: "#3FB6FF",
    R_BLUE: "#638DFF",
    R_INDIGO: "#797AF7",
    R_DEEPPURPLE: "#A17CF6",
    R_PURPLE: "#CE7BF0",
    R_MAGENTA: "#FF6FB0",
    R_RED: "#FF687A",
    R_ORANGE: "#FF875C",
    R_AMBER: "#FFD96B",
    R_YELLOW: "#FEFF78",
};
const STICKER_OPTION = {
    ELECTRIC: "electric",
    CHARGE_MAX: "charge-max",
    CHARGE_NONE: "charge-none",
    LOVELY: "lovely",
    TWINKLE: "twinkle",
};
const OPTION_TYPE = {
    LIMITED: "limited",
    BASIC: "basic",
};

export const COLOR_BACKGROUND_MAP = [
    COLOR_OPTION.R_BLUE,
    COLOR_OPTION.R_TEAL,
    COLOR_OPTION.C_SILVER,
    COLOR_OPTION.C_KHAKI,
    COLOR_OPTION.R_LIGHTBLUE,
    COLOR_OPTION.R_DEEPPURPLE,
    COLOR_OPTION.R_PURPLE,
    COLOR_OPTION.R_MAGENTA,
    COLOR_OPTION.R_INDIGO,
    COLOR_OPTION.R_AMBER,
    COLOR_OPTION.R_LIME,
    COLOR_OPTION.R_TEAL,
    COLOR_OPTION.R_LIGHTBLUE,
    COLOR_OPTION.C_CREAM,
    COLOR_OPTION.R_LIME,
    COLOR_OPTION.R_MAGENTA,
    COLOR_OPTION.R_LIGHTBLUE,
];

export const CASPER_OPTION = {
    [CUSTOM_OPTION.EYES]: [
        {
            id: EYES_OPTION["15INCH_ALLOY"],
            description: "15인치 알로이 휠 눈",
            type: OPTION_TYPE.LIMITED,
        },
        {
            id: EYES_OPTION["17INCH_ALLOY"],
            description: "17인치 알로이 휠 눈",
            type: OPTION_TYPE.LIMITED,
        },
        { id: EYES_OPTION.PIXEL, description: "픽셀 바이 픽셀 눈", type: OPTION_TYPE.LIMITED },
        { id: EYES_OPTION.ELECTRIC, description: "일렉트릭 눈", type: OPTION_TYPE.LIMITED },

        { id: EYES_OPTION.VACANT, description: "멍한 눈", type: OPTION_TYPE.BASIC },
        { id: EYES_OPTION.SMILE, description: "빙긋 눈", type: OPTION_TYPE.BASIC },
        { id: EYES_OPTION.CUTE, description: "깜찍 눈", type: OPTION_TYPE.BASIC },
        { id: EYES_OPTION.HEART, description: "하트 눈", type: OPTION_TYPE.BASIC },
    ],
    [CUSTOM_OPTION.EYES_DIRECTION]: [
        { id: POSITION_OPTION.CENTER, description: "정면을 보는" },
        { id: POSITION_OPTION.LEFT, description: "왼쪽을 보는" },
        { id: POSITION_OPTION.RIGHT, description: "오른쪽을 보는" },
    ],
    [CUSTOM_OPTION.MOUTH]: [
        { id: MOUTH_OPTION.SMILE, description: "미소 짓는 입", type: OPTION_TYPE.BASIC },
        { id: MOUTH_OPTION.CLOUDY, description: "언짢은 입", type: OPTION_TYPE.BASIC },
        { id: MOUTH_OPTION.MOCKING, description: "씨익 웃는 입", type: OPTION_TYPE.BASIC },
        { id: MOUTH_OPTION.LAUGH, description: "활짝 웃는 입", type: OPTION_TYPE.BASIC },
        { id: MOUTH_OPTION.EXPRESSIONLESS, description: "무표정 입", type: OPTION_TYPE.BASIC },
    ],
    [CUSTOM_OPTION.COLOR]: [
        { id: COLOR_OPTION.C_CREAM, description: "버터크림 옐로우 펄", type: OPTION_TYPE.LIMITED },
        {
            id: COLOR_OPTION.C_ORANGE,
            description: "시에나 오렌지 메탈릭",
            type: OPTION_TYPE.LIMITED,
        },
        { id: COLOR_OPTION.C_KHAKI, description: "더스크 블루 매트", type: OPTION_TYPE.LIMITED },
        { id: COLOR_OPTION.C_SILVER, description: "에어로 실버 매트", type: OPTION_TYPE.LIMITED },
        { id: COLOR_OPTION.C_BLACK, description: "어비스 블랙 펄", type: OPTION_TYPE.LIMITED },

        { id: COLOR_OPTION.R_LIME, description: "라임 그린", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_TEAL, description: "틸 그린", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_LIGHTBLUE, description: "라이트 블루", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_SKYBLUE, description: "스카이 블루", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_BLUE, description: "블루", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_INDIGO, description: "인디고", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_DEEPPURPLE, description: "딥 퍼플", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_PURPLE, description: "퍼플", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_MAGENTA, description: "마젠타", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_RED, description: "레드", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_ORANGE, description: "오렌지", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_AMBER, description: "골드", type: OPTION_TYPE.BASIC },
        { id: COLOR_OPTION.R_YELLOW, description: "옐로우", type: OPTION_TYPE.BASIC },
    ],
    [CUSTOM_OPTION.STICKER]: [
        {
            id: STICKER_OPTION.ELECTRIC,
            description: "전기 찌릿",
            type: OPTION_TYPE.LIMITED,
            position: "absolute",
        },
        { id: STICKER_OPTION.CHARGE_MAX, description: "충전 빵빵", type: OPTION_TYPE.LIMITED },
        { id: STICKER_OPTION.CHARGE_NONE, description: "배터리 깜빡", type: OPTION_TYPE.LIMITED },

        { id: STICKER_OPTION.LOVELY, description: "러블리 리본", type: OPTION_TYPE.BASIC },
        {
            id: STICKER_OPTION.TWINKLE,
            description: "반짝반짝",
            type: OPTION_TYPE.BASIC,
            position: "absolute",
        },
    ],
};

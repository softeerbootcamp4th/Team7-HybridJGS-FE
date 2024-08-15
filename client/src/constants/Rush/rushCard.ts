import { CardColor } from "@/types/rushGame.ts";

export const CARD_PHASE = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
};

export const CARD_COLOR = {
    BLUE: "blue",
    RED: "red",
    YELLOW: "yellow",
    GREEN: "green",
} as const;

export const CARD_OPTION = {
    LEFT_OPTIONS: 1,
    RIGHT_OPTIONS: 2,
} as const;

// TODO: 카드 색상 랜덤 기능 구현 후 불필요한 상수 데이터 삭제 (CARD_DAYS, CARD_COLORS)
export const CARD_DAYS = {
    DAY1: 1,
    DAY2: 2,
    DAY3: 3,
    DAY4: 4,
    DAY5: 5,
    DAY6: 6,
} as const;

export const CARD_COLORS: {
    [key in (typeof CARD_DAYS)[keyof typeof CARD_DAYS]]: {
        [CARD_OPTION.LEFT_OPTIONS]: CardColor;
        [CARD_OPTION.RIGHT_OPTIONS]: CardColor;
    };
} = {
    [CARD_DAYS.DAY1]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.BLUE,
    },
    [CARD_DAYS.DAY2]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.YELLOW,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY3]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.BLUE,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY4]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.YELLOW,
    },
    [CARD_DAYS.DAY5]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY6]: {
        [CARD_OPTION.LEFT_OPTIONS]: CARD_COLOR.BLUE,
        [CARD_OPTION.RIGHT_OPTIONS]: CARD_COLOR.YELLOW,
    },
};

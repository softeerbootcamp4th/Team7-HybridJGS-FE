export const CARD_TYPE = {
    LEFT_OPTIONS: 1,
    RIGHT_OPTIONS: 2,
} as const;

export const CARD_COLOR = {
    BLUE: "blue",
    RED: "red",
    YELLOW: "yellow",
    GREEN: "green",
} as const;

// TODO: 카드 색상 랜덤 기능 구현 후 불필요한 상수 데이터 삭제
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
        [CARD_TYPE.LEFT_OPTIONS]: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
        [CARD_TYPE.RIGHT_OPTIONS]: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    };
} = {
    [CARD_DAYS.DAY1]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.BLUE,
    },
    [CARD_DAYS.DAY2]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.YELLOW,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY3]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.BLUE,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY4]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.YELLOW,
    },
    [CARD_DAYS.DAY5]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.GREEN,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.RED,
    },
    [CARD_DAYS.DAY6]: {
        [CARD_TYPE.LEFT_OPTIONS]: CARD_COLOR.BLUE,
        [CARD_TYPE.RIGHT_OPTIONS]: CARD_COLOR.YELLOW,
    },
};

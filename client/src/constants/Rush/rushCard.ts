export const CARD_PHASE = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
} as const;

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

export const WIN_STATUS = {
    WIN: "Win",
    LOSE: "Lose",
    TIE: "Tie",
} as const;

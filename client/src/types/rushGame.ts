export type GamePhase = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type CardColor = "blue" | "red" | "yellow" | "green";
export type CardOption = 1 | 2;

export interface CardOptionState {
    mainText: string;
    subText: string;
    resultMainText?: string;
    resultSubText?: string;
    color: CardColor;
    selectionCount: number;
}

export interface RushGameContextType {
    gameState: {
        phase: GamePhase;
        userParticipatedStatus: boolean;
        userSelectedOption: CardOption | null;
        cardOptions: {
            [key in CardOption]: CardOptionState;
        };
    };
    preCountdown: number;
    runCountdown: number;
    setGamePhase: (phase: GamePhase) => void;
    setUserParticipationStatus: (status: boolean) => void;
    setUserSelectedOption: (option: CardOption | null) => void;
    updateCardOption: (option: CardOption, updates: Partial<CardOptionState>) => void;
}

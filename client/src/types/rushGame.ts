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

// TODO: 추후 밖에서 안쓰는 함수들 제거
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
    updateCardOptions: (option: CardOption, updates: Partial<CardOptionState>) => void;
    updateUserStatusAndSelectedOption: (token: string, selectedOption: CardOption) => Promise<void>;
}

import { CARD_COLOR, CARD_TYPE } from "@/constants/Rush/rushCard";

export type GamePhase = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type CardOption = CARD_TYPE.LEFT_OPTIONS | CARD_TYPE.RIGHT_OPTIONS;

export interface CardOptionState {
    mainText: string;
    subText: string;
    resultMainText?: string;
    resultSubText?: string;
    color: CARD_COLOR;
    selectionCount: number;
}

export interface RushGameContextType {
    gameState: {
        phase: GamePhase;
        countdown: number;
        userParticipatedStatus: boolean;
        userSelectedOption: CardOption | null;
        cardOptions: {
            [key in CardOption]: CardOptionState;
        };
    };
    setGamePhase: (phase: GamePhase) => void;
    setCountdown: (countdown: number) => void;
    setUserParticipationStatus: (status: boolean) => void;
    setUserSelectedOption: (option: CardOption | null) => void;
    updateCardOption: (option: CardOption, updates: Partial<CardOptionState>) => void;
}

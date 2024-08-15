import { CARD_COLOR, CARD_OPTION, CARD_PHASE } from "@/constants/Rush/rushCard.ts";

export type GamePhase = (typeof CARD_PHASE)[keyof typeof CARD_PHASE];
export type CardColor = (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
export type CardOption = (typeof CARD_OPTION)[keyof typeof CARD_OPTION];

export interface CardOptionState {
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    color: CardColor;
    selectionCount: number;
}

export interface RushGameContextType {
    gameState: {
        phase: GamePhase;
        userParticipatedStatus: boolean;
        userSelectedOption: CardOption;
        cardOptions: {
            [key in CardOption]: CardOptionState;
        };
    };
    preCountdown: number;
    runCountdown: number;
    updateCardOptions: (option: CardOption, updates: Partial<CardOptionState>) => void;
    updateUserStatusAndSelectedOption: (token: string, selectedOption: CardOption) => Promise<void>;
    getSelectedCardInfo: (option: CardOption) => CardOptionState;
    getOptionRatio: (option: CardOption) => number;
    fetchRushBalance: () => Promise<void>;
}

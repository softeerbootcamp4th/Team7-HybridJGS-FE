import { Dispatch } from "react";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE, WIN_STATUS } from "@/constants/Rush/rushCard.ts";

export type GamePhase = (typeof CARD_PHASE)[keyof typeof CARD_PHASE];
export type CardColor = (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
export type CardOption = (typeof CARD_OPTION)[keyof typeof CARD_OPTION];
export type WinStatus = (typeof WIN_STATUS)[keyof typeof WIN_STATUS];

export interface CardOptionState {
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    color: CardColor;
    selectionCount: number;
}

export interface RushGameStateType {
    phase: GamePhase;
    userParticipatedStatus: boolean;
    userSelectedOption: CardOption;
    cardOptions: {
        [key in CardOption]: CardOptionState;
    };
}

export const RUSH_ACTION = {
    SET_PHASE: "SET_PHASE",
    SET_USER_PARTICIPATION: "SET_USER_PARTICIPATION",
    SET_USER_OPTION: "SET_USER_OPTION",
    SET_CARD_OPTIONS: "SET_CARD_OPTIONS",
} as const;

export type RushGameAction =
    | { type: typeof RUSH_ACTION.SET_PHASE; payload: GamePhase }
    | { type: typeof RUSH_ACTION.SET_USER_PARTICIPATION; payload: boolean }
    | { type: typeof RUSH_ACTION.SET_USER_OPTION; payload: CardOption }
    | {
          type: typeof RUSH_ACTION.SET_CARD_OPTIONS;
          payload: { option: CardOption; updates: Partial<CardOptionState> };
      };

export type RushGameDispatchType = Dispatch<RushGameAction>;

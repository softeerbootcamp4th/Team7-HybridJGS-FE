import { Dispatch } from "react";
import { CARD_COLOR, CARD_OPTION, CARD_PHASE, WIN_STATUS } from "@/constants/Rush/rushCard.ts";

export type GamePhase = CARD_PHASE;
export type CardColor = CARD_COLOR;
export type CardOption = CARD_OPTION;
export type WinStatus = WIN_STATUS;

export interface CardOptionState {
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    color: CardColor;
    selectionCount: number;
}

export interface RushGameStateType {
    phase: GamePhase | null;
    userParticipatedStatus: boolean;
    userSelectedOption: CardOption;
    cardOptions: {
        [key in CardOption]: CardOptionState;
    };
}

export enum RUSH_ACTION {
    SET_PHASE = "SET_PHASE",
    SET_USER_PARTICIPATION = "SET_USER_PARTICIPATION",
    SET_USER_OPTION = "SET_USER_OPTION",
    SET_CARD_OPTIONS = "SET_CARD_OPTIONS",
}

export type RushGameAction =
    | { type: RUSH_ACTION.SET_PHASE; payload: GamePhase }
    | { type: RUSH_ACTION.SET_USER_PARTICIPATION; payload: boolean }
    | { type: RUSH_ACTION.SET_USER_OPTION; payload: CardOption }
    | {
          type: RUSH_ACTION.SET_CARD_OPTIONS;
          payload: { option: CardOption; updates: Partial<CardOptionState> };
      };

export type RushGameDispatchType = Dispatch<RushGameAction>;

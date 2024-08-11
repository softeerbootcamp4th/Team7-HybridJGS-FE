import { Dispatch } from "react";

export interface RushEventType {
    rushEventId: number;
    eventDate: string;
    openTime: string;
    closeTime: string;
    winnerCount: number;
    prizeImageUrl: string;
    prizeDescription: string;
}

export interface RushOptionType {
    rushOptionId: number;
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    imageUrl: string;
}

export interface RushPrizeType {
    prizeImageUrl: string;
    prizeDescription: string;
}

export interface RushEventStateType {
    rushList: RushEventType[];
    selectOptions: RushOptionType[];
    prize: RushPrizeType;
}

export const RUSH_ACTION = {
    SET_EVENT_LIST: "SET_EVENT_LIST",
    SET_OPTION: "SET_OPTION",
    SET_PRIZE: "SET_PRIZE",
} as const;

export type RushEventAction =
    | {
          type: typeof RUSH_ACTION.SET_EVENT_LIST;
          payload: RushEventType[];
      }
    | {
          type: typeof RUSH_ACTION.SET_OPTION;
          payload: RushOptionType[];
      }
    | {
          type: typeof RUSH_ACTION.SET_PRIZE;
          payload: RushPrizeType;
      };

export type RushEventDispatchType = Dispatch<RushEventAction>;

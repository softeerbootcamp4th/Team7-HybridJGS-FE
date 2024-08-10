import { Dispatch } from "react";
import { InfiniteListData } from "./common";

export interface RushEventType {
    rushEventId: number;
    eventDate: string;
    openTime: string;
    closeTime: string;
    winnerCount: number;
    prizeImageUrl: string;
    prizeDescription: string;
}

export interface RushEventStateType {
    rushList: RushEventType[];
}

export const RUSH_ACTION = {
    SET_EVENT_LIST: "SET_EVENT_LIST",
} as const;

export type RushEventAction = {
    type: typeof RUSH_ACTION.SET_EVENT_LIST;
    payload: RushEventType[];
};

export type RushEventDispatchType = Dispatch<RushEventAction>;

export interface RushApplicantType {
    phone_number: string;
    balance_game_choice: string;
    created_at: string;
}

export interface GetRushParticipantListParams {
    id: number;
    size: number;
    page: number;
    option: number;
    phoneNumber?: string;
}

export interface RushParticipantType {
    id: number;
    phoneNumber: string;
    balanceGameChoice: number;
    createdAt: string;
    rank: number;
}
export interface GetRushParticipantListResponse extends InfiniteListData<RushParticipantType> {}

export interface GetRushOptionsParams {
    id: number;
}

export interface RushOptionType {
    rushOptionId: number;
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    imageUrl: string;
}

export type GetRushOptionsResponse = RushOptionType[];

import { Dispatch } from "react";
import { EVENT_STATUS } from "@/constants/common";
import { OPTION_POSITION } from "@/constants/rush";

export type RushEventStatusType = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
export interface RushEventType {
    rushEventId: number;
    eventDate: string;
    startTime: string;
    endTime: string;
    winnerCount: number;
    prizeImageUrl: string;
    prizeDescription: string;
    status: RushEventStatusType;
    options: RushOptionType[];
}

type RushOptionPositionType = (typeof OPTION_POSITION)[keyof typeof OPTION_POSITION];

export interface RushOptionType {
    optionId: number;
    mainText: string;
    subText: string;
    resultMainText: string;
    resultSubText: string;
    imageUrl: string;
    position: RushOptionPositionType;
}

export interface RushPrizeType {
    prizeImageUrl: string;
    prizeDescription: string;
}

export interface RushEventStateType {
    rushList: RushEventType[];
}

export const RUSH_ACTION = {
    SET_EVENT_LIST: "SET_EVENT_LIST",
} as const;

export type ImageType = { imgName: string; imgFile: File };

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

export interface RushParticipantType {
    id: number;
    phoneNumber: string;
    balanceGameChoice: number;
    rank: number;
    createdDate: string;
    createdTime: string;
}

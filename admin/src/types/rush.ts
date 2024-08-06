import { Dispatch } from "react";

export interface RushEventType {
    rush_event_id: number;
    event_date: string;
    open_time: string;
    close_time: string;
    winner_count: number;
    prize_image_url: string;
    prize_description: string;
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

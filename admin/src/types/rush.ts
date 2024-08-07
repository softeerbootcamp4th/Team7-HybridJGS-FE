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

export interface RushApplicantType {
    phone_number: string;
    balance_game_choice: string;
    created_at: string;
}

export interface RushSelectionType {
    rush_option_id: string;
    main_text: string;
    sub_text: string;
    result_main_text: string;
    result_sub_text: string;
    image_url: string;
}

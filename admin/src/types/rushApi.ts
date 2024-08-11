import { InfiniteListData } from "./common";
import { RushOptionType, RushParticipantType } from "./rush";

export interface GetRushParticipantListParams {
    id: number;
    size: number;
    page: number;
    option: number;
    phoneNumber?: string;
}

export type GetRushOptionsResponse = RushOptionType[];

export type GetRushParticipantListResponse = InfiniteListData<RushParticipantType>;

export interface GetRushWinnerListParams {
    id: number;
    size: number;
    page: number;
    phoneNumber?: string;
}
export type GetRushWinnerListResponse = InfiniteListData<RushParticipantType>;

export interface GetRushOptionsParams {
    id: number;
}

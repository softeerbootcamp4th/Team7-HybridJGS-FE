import { InfiniteParticipantListData } from "./common";
import { RushEventType, RushOptionType, RushParticipantType } from "./rush";

export interface GetRushParticipantListParams {
    id: number;
    size: number;
    page: number;
    option: number;
    phoneNumber?: string;
}

export type GetRushEventResponse = RushEventType[];

export type GetRushOptionsResponse = RushOptionType[];

export type GetRushParticipantListResponse = InfiniteParticipantListData<RushParticipantType>;

export interface GetRushWinnerListParams {
    id: number;
    size: number;
    page: number;
    phoneNumber?: string;
}
export type GetRushWinnerListResponse = InfiniteParticipantListData<RushParticipantType>;

export interface GetRushOptionsParams {
    id: number;
}

export type PutRushEventParams = Omit<RushEventType, "status">[];

export type PutRushEventResponse = RushEventType[];

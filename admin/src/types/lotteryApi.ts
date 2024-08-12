import { InfiniteParticipantListData } from "./common";
import { LotteryEventType, LotteryExpectationsType, LotteryWinnerType } from "./lottery";

export type GetLotteryResponse = LotteryEventType[];

export interface PostLotteryWinnerResponse {
    message: string;
}

export interface GetLotteryWinnerParams {
    size: number;
    page: number;
    phoneNumber?: string;
}

export interface GetLotteryExpectationsParams {
    participantId: number;
}

export type GetLotteryExpectationsResponse = LotteryExpectationsType[];

export type GetLotteryWinnerResponse = InfiniteParticipantListData<LotteryWinnerType>;

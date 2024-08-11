import { InfiniteListData } from "./common";
import { LotteryExpectationsType, LotteryType, LotteryWinnerType } from "./lottery";

export type GetLotteryResponse = LotteryType[];

export interface PostLotteryWinnerParams {
    id: number;
}

export interface PostLotteryWinnerResponse {
    message: string;
}

export interface GetLotteryWinnerParams {
    id: number;
    size: number;
    page: number;
}

export interface GetLotteryExpectationsParams {
    lotteryId: number;
    participantId: number;
}

export type GetLotteryExpectationsResponse = LotteryExpectationsType[];

export type GetLotteryWinnerResponse = InfiniteListData<LotteryWinnerType>;

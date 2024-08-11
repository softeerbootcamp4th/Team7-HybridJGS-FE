import { InfiniteListData } from "./common";

export type GetLotteryResponse = {
    lotteryEventId: number;
    startDate: string;
    endDate: string;
    appliedCount: number;
    winnerCount: number;
}[];

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

export interface LotteryExpectationsType {
    casperId: number;
    expectation: string;
}

export type GetLotteryExpectationsResponse = LotteryExpectationsType[];

export interface LotteryWinnerType {
    id: number;
    phoneNumber: string;
    linkClickedCounts: number;
    expectation: number;
    appliedCount: number;
}
export interface GetLotteryWinnerResponse extends InfiniteListData<LotteryWinnerType> {}

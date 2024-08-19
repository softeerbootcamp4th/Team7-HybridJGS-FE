import { InfiniteExpectationListData, InfiniteParticipantListData } from "./common";
import {
    LotteryEventType,
    LotteryExpectationsType,
    LotteryParticipantType,
    LotteryWinnerType,
} from "./lottery";

export type GetLotteryResponse = LotteryEventType;

export type PutLotteryParams = Pick<
    LotteryEventType,
    "startDate" | "startTime" | "endDate" | "endTime" | "winnerCount"
>;

export type PutLotteryResponse = Pick<
    LotteryEventType,
    "startDate" | "startTime" | "endDate" | "endTime" | "winnerCount"
>;

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
    size: number;
    page: number;
}

export interface PatchLotteryExpectationParams {
    casperId: number;
}

export type GetLotteryExpectationsResponse = InfiniteExpectationListData<LotteryExpectationsType>;

export type GetLotteryWinnerResponse = InfiniteParticipantListData<LotteryWinnerType>;

export type GetLotteryParticipantResponse = InfiniteParticipantListData<LotteryParticipantType>;

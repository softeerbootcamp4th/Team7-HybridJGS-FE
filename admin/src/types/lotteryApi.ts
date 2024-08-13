import { InfiniteParticipantListData } from "./common";
import {
    LotteryEventType,
    LotteryExpectationsType,
    LotteryParticipantType,
    LotteryWinnerType,
} from "./lottery";

export interface GetLotteryResponse extends LotteryEventType {}

export interface PutLotteryParams {
    startDateTime: string;
    endDateTime: string;
    winnerCount: number;
}

export interface PutLotteryResponse {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    winnerCount: number;
}

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

export type GetLotteryParticipantResponse = InfiniteParticipantListData<LotteryParticipantType>;

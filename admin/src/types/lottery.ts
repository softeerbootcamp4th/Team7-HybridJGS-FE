import { EVENT_STATUS } from "@/constants/common";

export interface LotteryEventType {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    appliedCount: number;
    winnerCount: number;
    status: EVENT_STATUS;
}

export interface LotteryExpectationsType {
    casperId: number;
    expectation: string;
    createdDate: string;
    createdTime: string;
}

export interface LotteryWinnerType {
    id: number;
    phoneNumber: string;
    linkClickedCounts: number;
    expectation: number;
    appliedCount: number;
    createdDate: string;
    createdTime: string;
}

export type LotteryParticipantType = LotteryWinnerType;

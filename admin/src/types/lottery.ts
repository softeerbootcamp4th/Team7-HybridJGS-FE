import { EVENT_STATUS } from "@/constants/common";

export type LotteryEventStatusType = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
export interface LotteryEventType {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    appliedCount: number;
    winnerCount: number;
    status: LotteryEventStatusType;
}

export interface LotteryExpectationsType {
    casperId: number;
    expectation: string;
}

export interface LotteryWinnerType {
    id: number;
    phoneNumber: string;
    linkClickedCounts: number;
    expectation: number;
    appliedCount: number;
}

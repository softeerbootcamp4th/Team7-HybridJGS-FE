export interface LotteryEventType {
    lotteryEventId: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    appliedCount: number;
    winnerCount: number;
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

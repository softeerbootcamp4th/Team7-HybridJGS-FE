export interface LotteryType {
    lotteryEventId: number;
    startDate: string;
    endDate: string;
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

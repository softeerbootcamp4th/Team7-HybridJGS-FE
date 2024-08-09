export type GetLotteryResponse = {
    lotteryEventId: number;
    startDate: string;
    endDate: string;
    appliedCount: number;
    winnerCount: number;
}[];

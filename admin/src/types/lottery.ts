export type GetLotteryResponse = {
    lotteryEventId: number;
    startDate: string;
    endDate: string;
    appliedCount: number;
    winnerCount: number;
}[];

export interface PostLotteryParams {
    id: number;
}

export interface PostLotteryResponse {
    message: string;
}

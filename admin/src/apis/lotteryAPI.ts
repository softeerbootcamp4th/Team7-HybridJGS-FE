import { GetLotteryResponse, PostLotteryParams, PostLotteryResponse } from "@/types/lottery";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event/lottery`;
const headers = {
    "Content-Type": "application/json",
};

export const LotteryAPI = {
    async getLottery(): Promise<GetLotteryResponse> {
        try {
            return new Promise((resolve) =>
                resolve([
                    {
                        lotteryEventId: 1,
                        startDate: "2024-07-26 00:00",
                        endDate: "2024-08-25 23:59",
                        appliedCount: 1000000,
                        winnerCount: 363,
                    },
                ])
            );
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "GET",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async postLotteryWinner({ id }: PostLotteryParams): Promise<PostLotteryResponse> {
        try {
            return new Promise((resolve) => resolve({ message: "요청에 성공하였습니다." }));
            const response = await fetchWithTimeout(`${baseURL}/${id}/winner`, {
                method: "POST",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

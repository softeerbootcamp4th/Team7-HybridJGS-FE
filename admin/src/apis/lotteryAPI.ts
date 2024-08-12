import {
    GetLotteryExpectationsParams,
    GetLotteryExpectationsResponse,
    GetLotteryResponse,
    GetLotteryWinnerParams,
    GetLotteryWinnerResponse,
    PostLotteryWinnerResponse,
} from "@/types/lotteryApi";
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
                        startDate: "2024-07-26",
                        startTime: "00:00",
                        endDate: "2024-08-25",
                        endTime: "23:59",
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
    async postLotteryWinner(): Promise<PostLotteryWinnerResponse> {
        try {
            return new Promise((resolve) => resolve({ message: "요청에 성공하였습니다." }));
            const response = await fetchWithTimeout(`${baseURL}/winner`, {
                method: "POST",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getLotteryWinner({
        id,
        size,
        page,
        phoneNumber,
    }: GetLotteryWinnerParams): Promise<GetLotteryWinnerResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    participants: [
                        {
                            id: 1,
                            phoneNumber: "010-1111-2222",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                        {
                            id: 2,
                            phoneNumber: "010-1111-2223",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2224",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                    ],
                    isLastPage: false,
                    totalParticipants: 10000,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/${id}/winner?size=${size}&page=${page}&number=${phoneNumber}`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getLotteryExpectations({
        lotteryId,
        participantId,
    }: GetLotteryExpectationsParams): Promise<GetLotteryExpectationsResponse> {
        try {
            return new Promise((resolve) =>
                resolve([
                    {
                        casperId: 1,
                        expectation: "기대평 1",
                    },
                    {
                        casperId: 2,
                        expectation: "기대평 2",
                    },
                    {
                        casperId: 3,
                        expectation: "기대평 3",
                    },
                ])
            );
            const response = await fetchWithTimeout(
                `${baseURL}/${lotteryId}/participants/${participantId}/expectations`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

import {
    GetLotteryExpectationsParams,
    GetLotteryExpectationsResponse,
    GetLotteryParticipantResponse,
    GetLotteryResponse,
    GetLotteryWinnerParams,
    GetLotteryWinnerResponse,
    PostLotteryWinnerResponse,
    PutLotteryParams,
    PutLotteryResponse,
} from "@/types/lotteryApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event/lottery`;
const headers = {
    "Content-Type": "application/json",
};

export const LotteryAPI = {
    async getLottery(token: string): Promise<GetLotteryResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async putLottery(body: PutLotteryParams, token: string): Promise<PutLotteryResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    startDate: "2024-08-26",
                    startTime: "00:00:00",
                    endDate: "2024-09-25 23:59",
                    endTime: "00:00:00",
                    winnerCount: 363,
                })
            );
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "PUT",
                headers: { ...headers, Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async postLotteryWinner(token: string): Promise<PostLotteryWinnerResponse> {
        try {
            return new Promise((resolve) => resolve({ message: "요청에 성공하였습니다." }));
            const response = await fetchWithTimeout(`${baseURL}/winner`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getLotteryParticipant(
        { size, page, phoneNumber }: GetLotteryWinnerParams,
        token: string
    ): Promise<GetLotteryParticipantResponse> {
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
                            createdAt: "2024-08-12T02:10:37.279369",
                            updatedAt: "2024-08-12T02:13:48.390954",
                        },
                        {
                            id: 2,
                            phoneNumber: "010-1111-2223",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                            createdAt: "2024-08-12T02:10:37.279369",
                            updatedAt: "2024-08-12T02:13:48.390954",
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2224",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                            createdAt: "2024-08-12T02:10:37.279369",
                            updatedAt: "2024-08-12T02:13:48.390954",
                        },
                    ],
                    isLastPage: true,
                    totalParticipants: 10000,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/participants?size=${size}&page=${page}&number=${phoneNumber}`,
                {
                    method: "GET",
                    headers: { ...headers, Authorization: `Bearer ${token}` },
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getLotteryWinner(
        { size, page, phoneNumber }: GetLotteryWinnerParams,
        token: string
    ): Promise<GetLotteryWinnerResponse> {
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
                `${baseURL}/winner?size=${size}&page=${page}&number=${phoneNumber}`,
                {
                    method: "GET",
                    headers: { ...headers, Authorization: `Bearer ${token}` },
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getLotteryExpectations(
        { participantId }: GetLotteryExpectationsParams,
        token: string
    ): Promise<GetLotteryExpectationsResponse> {
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
                `${baseURL}/participants/${participantId}/expectations`,
                {
                    method: "GET",
                    headers: { ...headers, Authorization: `Bearer ${token}` },
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

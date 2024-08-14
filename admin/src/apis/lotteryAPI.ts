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
                    participantsList: [
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
                        createdDate: "2024-08-15",
                        createdTime: "22:00:00",
                    },
                    {
                        casperId: 2,
                        expectation: "기대평 2",
                        createdDate: "2024-08-15",
                        createdTime: "22:00:00",
                    },
                    {
                        casperId: 3,
                        expectation: "기대평 3",
                        createdDate: "2024-08-15",
                        createdTime: "22:00:00",
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

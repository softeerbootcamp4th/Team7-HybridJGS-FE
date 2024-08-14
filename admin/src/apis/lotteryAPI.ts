import {
    GetLotteryExpectationsParams,
    GetLotteryExpectationsResponse,
    GetLotteryParticipantResponse,
    GetLotteryResponse,
    GetLotteryWinnerParams,
    GetLotteryWinnerResponse,
    PatchLotteryExpectationParams,
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
        { participantId, size, page }: GetLotteryExpectationsParams,
        token: string
    ): Promise<GetLotteryExpectationsResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    expectations: [
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
                    ],
                    isLastPage: false,
                    totalExpectations: 100,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/participants/${participantId}/expectations?page=${page}&size=${size}`,
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
    async patchLotteryExpectation(
        { casperId }: PatchLotteryExpectationParams,
        token: string
    ): Promise<{}> {
        try {
            await fetchWithTimeout(`${baseURL}/expectations/${casperId}`, {
                method: "PATCH",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return {};
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

import {
    GetRushEventResponse,
    GetRushOptionsParams,
    GetRushOptionsResponse,
    GetRushParticipantListParams,
    GetRushParticipantListResponse,
    GetRushWinnerListParams,
    PutRushEventParams,
    PutRushEventResponse,
} from "@/types/rushApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    async getRush(token: string): Promise<GetRushEventResponse> {
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
    async putRush(body: PutRushEventParams, token: string): Promise<PutRushEventResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "PUT",
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushParticipantList(
        { id, phoneNumber, size, page, option }: GetRushParticipantListParams,
        token: string
    ): Promise<GetRushParticipantListResponse> {
        try {
            const response = await fetchWithTimeout(
                `${baseURL}/${id}/participants?number=${phoneNumber}&size=${size}&page=${page}&option=${option}`,
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
    async getRushWinnerList(
        { id, phoneNumber, size, page }: GetRushWinnerListParams,
        token: string
    ): Promise<GetRushParticipantListResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    participantsList: [
                        {
                            id: 1,
                            phoneNumber: "010-3843-6999",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:123",
                            rank: 1,
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:125",
                            rank: 2,
                        },
                        {
                            id: 4,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:127",
                            rank: 3,
                        },
                    ],
                    isLastPage: false,
                    totalParticipants: 10000,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/${id}/winner?number=${phoneNumber}&size=${size}&page=${page}`,
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
    async getRushOptions(
        { id }: GetRushOptionsParams,
        token: string
    ): Promise<GetRushOptionsResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/${id}/options`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};
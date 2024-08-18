import {
    GetRushBalanceResponse,
    GetRushOptionResultResponse,
    GetRushResultResponse,
    GetRushUserParticipationStatusResponse,
    GetTodayRushEventResponse,
    GetTotalRushEventsResponse,
    RushEventStatusCodeResponse,
} from "@/types/rushApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    async getRush(): Promise<GetTotalRushEventsResponse> {
        try {
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
    async getRushUserParticipationStatus(
        token: string
    ): Promise<GetRushUserParticipationStatusResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/applied`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getTodayRushEvent(token: string): Promise<GetTodayRushEventResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/today`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async postSelectedRushOptionApply(
        token: string,
        optionId: number
    ): Promise<RushEventStatusCodeResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/options/${optionId}/apply`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });

            if (response.status === 204 || response.status === 404) {
                return response.status;
            }

            throw new Error(`Unexpected response status: ${response.status}`);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushOptionResult(
        token: string,
        optionId: number
    ): Promise<GetRushOptionResultResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/options/${optionId}/result`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushBalance(token: string): Promise<GetRushBalanceResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/balance`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushResult(token: string): Promise<GetRushResultResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/result`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushTodayEventTest(): Promise<RushEventStatusCodeResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/today/test`, {
                method: "GET",
                headers: headers,
            });
            if (response.status === 204 || response.status === 404) {
                return response.status;
            }

            throw new Error(`Unexpected response status: ${response.status}`);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

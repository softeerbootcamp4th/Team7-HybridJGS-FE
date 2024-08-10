import {
    GetRushBalanceResponse,
    GetRushOptionResultResponse,
    GetRushResultResponse,
    GetRushUserParticipationStatusResponse,
    GetTodayRushEventResponse,
    GetTotalRushEventsResponse,
    PostSelectedRushCardOptionResponse,
} from "@/types/rushApi";

const baseURL = `${import.meta.env.VITE_API_URL}/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    async getRush(): Promise<GetTotalRushEventsResponse> {
        try {
            const response = await fetch(`${baseURL}`, {
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
            const response = await fetch(`${baseURL}/applied`, {
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
            const response = await fetch(`${baseURL}/today`, {
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
    ): Promise<PostSelectedRushCardOptionResponse> {
        try {
            const response = await fetch(`${baseURL}/options/${optionId}/apply`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
                body: JSON.stringify({}),
            });
            return response.json();
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
            const response = await fetch(`${baseURL}/options/${optionId}/result`, {
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
            const response = await fetch(`${baseURL}/balance`, {
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
            const response = await fetch(`${baseURL}/result`, {
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

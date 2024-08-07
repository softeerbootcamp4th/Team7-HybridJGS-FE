import {
    GetApplyCountResponse,
    GetCasperListResponse,
    GetLotteryResponse,
    PostCasperRequestBody,
    PostCasperResponse,
} from "@/types/lotteryApi";

const baseURL = `${import.meta.env.VITE_API_URL}/event/lottery`;
const headers = {
    "Content-Type": "application/json",
};

export const LotteryAPI = {
    async getLottery(): Promise<GetLotteryResponse> {
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
    async getCasperList(): Promise<GetCasperListResponse> {
        try {
            const response = await fetch(`${baseURL}/caspers`, {
                method: "GET",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getApplyCount(token: string): Promise<GetApplyCountResponse> {
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
    async postCasper(token: string, body: PostCasperRequestBody): Promise<PostCasperResponse> {
        try {
            const response = await fetch(`${baseURL}`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

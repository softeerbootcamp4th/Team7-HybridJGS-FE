import {
    GetApplyCountResponse,
    GetCasperListResponse,
    GetLotteryResponse,
    PostCasperRequestBody,
    PostCasperResponse,
} from "@/types/lotteryApi";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/event/lottery`;
const headers = {
    "Content-Type": "application/json",
};

export const LotteryAPI = {
    async getLottery(): Promise<GetLotteryResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "GET",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    },
    async getCasperList(): Promise<GetCasperListResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/caspers`, {
                method: "GET",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    },
    async getApplyCount(token: string): Promise<GetApplyCountResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/applied`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    },
    async postCasper(token: string, body: PostCasperRequestBody): Promise<PostCasperResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}/casperBot`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    },
};

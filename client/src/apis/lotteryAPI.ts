import { GetCasperListResponse } from "@/types/lotteryApi";

const baseURL = `${import.meta.env.VITE_API_URL}/event/lottery`;
const headers = {
    "Content-Type": "application/json",
};

export const LotteryAPI = {
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
};

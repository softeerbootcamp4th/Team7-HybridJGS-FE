import { GetLotteryResponse } from "@/types/adminApi";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event`;
const headers = {
    "Content-Type": "application/json",
};

export const AdminAPI = {
    async getLottery(): Promise<GetLotteryResponse> {
        try {
            const response = await fetch(`${baseURL}/lottery`, {
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

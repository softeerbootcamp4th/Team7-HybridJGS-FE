import { GetTotalEventDateResponse } from "@/types/totalApi.ts";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/event/total`;
const headers = {
    "Content-Type": "application/json",
};

export const TotalAPI = {
    async getTotal(): Promise<GetTotalEventDateResponse> {
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
};

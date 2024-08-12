import { GetTotalEventDateResponse } from "@/types/totalApi.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/event/total`;
const headers = {
    "Content-Type": "application/json",
};

export const TotalAPI = {
    async getTotal(): Promise<GetTotalEventDateResponse> {
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
};

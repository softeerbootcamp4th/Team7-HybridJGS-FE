import { GetShareLinkResponse } from "@/types/linkApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/link`;
const headers = {
    "Content-Type": "application/json",
};

export const LinkAPI = {
    async getShareLink(token: string): Promise<GetShareLinkResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            throw error;
        }
    },
};

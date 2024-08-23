import { PostAuthParams, PostAuthResponse } from "@/types/authApi";
import "@/types/lotteryApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/auth`;
const headers = {
    "Content-Type": "application/json",
};

export const AuthAPI = {
    async postAuth(body: PostAuthParams): Promise<PostAuthResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            return response.json();
        } catch (error) {
            throw error;
        }
    },
};

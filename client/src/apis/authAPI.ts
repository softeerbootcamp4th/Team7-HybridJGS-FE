import { PostAuthRequestBody, PostAuthResponse } from "@/types/authApi";

const baseURL = `${import.meta.env.VITE_API_URL}/event/auth`;
const headers = {
    "Content-Type": "application/json",
};

export const AuthAPI = {
    async getAuthToken(body: PostAuthRequestBody): Promise<PostAuthResponse> {
        try {
            const response = await fetch(`${baseURL}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

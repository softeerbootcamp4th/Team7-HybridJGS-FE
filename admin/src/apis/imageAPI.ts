import { PostImageResponse } from "@/types/imageApi";
import "@/types/lotteryApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/image`;

export const ImageAPI = {
    async postImage(image: FormData, token: string): Promise<PostImageResponse> {
        try {
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: image,
            });

            return response.json();
        } catch (error) {
            throw error;
        }
    },
};

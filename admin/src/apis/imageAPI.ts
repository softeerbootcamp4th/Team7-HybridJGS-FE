import { PostImageResponse } from "@/types/imageApi";
import "@/types/lotteryApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/image`;

export const ImageAPI = {
    async postImage(image: FormData): Promise<PostImageResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    imageUrl:
                        "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004",
                })
            );
            const response = await fetchWithTimeout(`${baseURL}`, {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: image,
            });

            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

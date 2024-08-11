import {
    GetRushOptionsParams,
    GetRushOptionsResponse,
    GetRushParticipantListParams,
    GetRushParticipantListResponse,
    GetRushWinnerListParams,
} from "@/types/rush";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    async getRushParticipantList({
        id,
        phoneNumber,
        size,
        page,
        option,
    }: GetRushParticipantListParams): Promise<GetRushParticipantListResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    data: [
                        {
                            id: 1,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: option,
                            createdAt: "2024-07-25 20:00:123",
                            rank: 1,
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: option,
                            createdAt: "2024-07-25 20:00:125",
                            rank: 2,
                        },
                        {
                            id: 4,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: option,
                            createdAt: "2024-07-25 20:00:127",
                            rank: 3,
                        },
                    ],
                    isLastPage: false,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/${id}/participants?number=${phoneNumber}&size=${size}&page=${page}&option=${option}`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushWinnerList({
        id,
        phoneNumber,
        size,
        page,
    }: GetRushWinnerListParams): Promise<GetRushParticipantListResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    data: [
                        {
                            id: 1,
                            phoneNumber: "010-3843-6999",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:123",
                            rank: 1,
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:125",
                            rank: 2,
                        },
                        {
                            id: 4,
                            phoneNumber: "010-1111-2222",
                            balanceGameChoice: 1,
                            createdAt: "2024-07-25 20:00:127",
                            rank: 3,
                        },
                    ],
                    isLastPage: false,
                })
            );
            const response = await fetchWithTimeout(
                `${baseURL}/${id}/participants?number=${phoneNumber}&size=${size}&page=${page}`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    async getRushOptions({ id }: GetRushOptionsParams): Promise<GetRushOptionsResponse> {
        try {
            return new Promise((resolve) =>
                resolve([
                    {
                        rushOptionId: 1,
                        mainText: "첫 차로 저렴한 차 사기",
                        subText: " 첫 차는 가성비가 짱이지!",
                        resultMainText: "누구보다 가성비 갑인 캐스퍼 일렉트릭",
                        resultSubText: "전기차 평균보다 훨씬 저렴한 캐스퍼 일렉트릭!",
                        imageUrl: "left_image.png",
                    },
                    {
                        rushOptionId: 2,
                        mainText: "첫 차로 성능 좋은 차 사기",
                        subText: " 차는 당연히 성능이지!",
                        resultMainText: "필요한 건 다 갖춘 캐스퍼 일렉트릭",
                        resultSubText: "전기차 평균보다 훨씨니 저렴한 캐스퍼 일렉트릭!",
                        imageUrl: "left_image.png",
                    },
                ])
            );
            const response = await fetchWithTimeout(`${baseURL}/${id}/options`, {
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

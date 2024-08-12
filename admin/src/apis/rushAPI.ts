import {
    GetRushEventResponse,
    GetRushOptionsParams,
    GetRushOptionsResponse,
    GetRushParticipantListParams,
    GetRushParticipantListResponse,
    GetRushWinnerListParams,
} from "@/types/rushApi";
import { fetchWithTimeout } from "@/utils/fetchWithTimeout";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    async getRush(): Promise<GetRushEventResponse> {
        try {
            return new Promise((resolve) =>
                resolve([
                    {
                        rushEventId: 1,
                        eventDate: "2024-07-25",
                        openTime: "20:00:00",
                        closeTime: "20:10:00",
                        winnerCount: 315,
                        prizeImageUrl: "prize1.png",
                        prizeDescription: "스타벅스 1만원 기프트카드",
                        status: "BEFORE",
                    },
                    {
                        rushEventId: 2,
                        eventDate: "2024-07-26",
                        openTime: "20:00:00",
                        closeTime: "20:10:00",
                        winnerCount: 315,
                        prizeImageUrl: "prize2.png",
                        prizeDescription: "올리브영 1만원 기프트카드",
                        status: "DURING",
                    },
                    {
                        rushEventId: 3,
                        eventDate: "2024-07-27",
                        openTime: "20:00:00",
                        closeTime: "20:10:00",
                        winnerCount: 315,
                        prizeImageUrl: "prize3.png",
                        prizeDescription: "배달의 민족 1만원 기프트카드",
                        status: "AFTER",
                    },
                ])
            );
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
                    participants: [
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
                    totalParticipants: 10000,
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
                    participants: [
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
                    totalParticipants: 10000,
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

import {
    GetRushBalanceResponse,
    GetRushOptionResultResponse,
    GetRushParticipationStatusResponse,
    GetRushResultResponse,
    GetTodayRushEventResponse,
    GetTotalRushEventsResponse,
    PostSelectedRushCardOptionResponse,
} from "@/types/rushApi";

const baseURL = `${import.meta.env.VITE_API_URL}/event/rush`;
const headers = {
    "Content-Type": "application/json",
};

export const RushAPI = {
    // 밸런스 게임 전체 조회 : 서버 시간 연동 (GET) /event/rush
    // (서버 시간) - (이벤트 시작 시간) => 카운트 다운 진행
    async getRush(): Promise<GetTotalRushEventsResponse> {
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
    // 밸런스 게임 참여 여부 조회 (GET) /event/rush/applied
    async getRushParticipationStatus(token: string): Promise<GetRushParticipationStatusResponse> {
        try {
            const response = await fetch(`${baseURL}/applied`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // 밸런스 게임 옵션 선택지 정보 조회 (GET) /event/rush/today
    async getTodayRushEvent(token: string): Promise<GetTodayRushEventResponse> {
        try {
            const response = await fetch(`${baseURL}/today`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // 밸런스 게임 옵션 선택 (응모) (POST) /event/rush/options/{optionId}/apply
    async postSelectedRushOptionApply(
        token: string,
        optionId: number
    ): Promise<PostSelectedRushCardOptionResponse> {
        try {
            const response = await fetch(`${baseURL}/options/${optionId}/apply`, {
                method: "POST",
                headers: { ...headers, Authorization: `Bearer ${token}` },
                body: JSON.stringify({}),
            });
            switch (response.status) {
                case 204:
                    return 204;
                case 404:
                    return 404;
                default:
                    throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // 밸런스 게임 카드 선택 결과 (GET) /event/rush/options/{optionId}/result
    async getRushOptionResult(
        token: string,
        optionId: number
    ): Promise<GetRushOptionResultResponse> {
        try {
            const response = await fetch(`${baseURL}/options/${optionId}/result`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // 밸런스 게임 선택 비율 조회 (GET) /event/rush/balance
    async getRushBalance(token: string): Promise<GetRushBalanceResponse> {
        try {
            const response = await fetch(`${baseURL}/balance`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // 밸런스 게임 결과 조회 (GET) /event/rush/result
    async getRushResult(token: string): Promise<GetRushResultResponse> {
        try {
            const response = await fetch(`${baseURL}/result`, {
                method: "GET",
                headers: { ...headers, Authorization: `Bearer ${token}` },
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
};

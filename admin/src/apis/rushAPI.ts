import { GetRushParticipantListParams } from "@/types/rush";
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
    }: GetRushParticipantListParams): Promise<GetLotteryWinnerResponse> {
        try {
            return new Promise((resolve) =>
                resolve({
                    data: [
                        {
                            id: 1,
                            phoneNumber: "010-1111-2222",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                        {
                            id: 2,
                            phoneNumber: "010-1111-2223",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                        {
                            id: 3,
                            phoneNumber: "010-1111-2224",
                            linkClickedCounts: 1,
                            expectation: 1,
                            appliedCount: 3,
                        },
                    ],
                    isLastPage: true,
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
};

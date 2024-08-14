import { InfiniteExpectationListData, InfiniteParticipantListData } from "@/types/common";

export function isInfiniteParticipantListData<T>(
    data: any
): data is InfiniteParticipantListData<T> {
    return (
        data.participantsList !== undefined &&
        Array.isArray(data.participantsList) &&
        typeof data.totalParticipants === "number"
    );
}

export function isInfiniteExpectationListData<T>(
    data: any
): data is InfiniteExpectationListData<T> {
    return (
        data.expectationList !== undefined &&
        Array.isArray(data.expectationList) &&
        typeof data.totalExpectations === "number"
    );
}

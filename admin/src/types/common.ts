export interface InfiniteParticipantListData<T> {
    participantsList: T[];
    isLastPage: boolean;
    totalParticipants: number;
}

export interface InfiniteExpectationListData<T> {
    expectations: T[];
    isLastPage: boolean;
    totalExpectations: number;
}

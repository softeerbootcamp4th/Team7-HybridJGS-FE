export interface InfiniteParticipantListData<T> {
    participantsList: T[];
    isLastPage: boolean;
    totalParticipants: number;
}

export interface InfiniteExpectationListData<T> {
    expectationList: T[];
    isLastPage: boolean;
    totalExpectations: number;
}

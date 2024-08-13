export interface InfiniteParticipantListData<T> {
    participantsList: T[];
    isLastPage: boolean;
    totalParticipants: number;
}

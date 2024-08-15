export interface InfiniteParticipantListData<T> {
    participants: T[];
    isLastPage: boolean;
    totalParticipants: number;
}

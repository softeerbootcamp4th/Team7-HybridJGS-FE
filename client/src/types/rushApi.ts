interface RushEventType {
    rushEventId: number;
    startDateTime: string;
    endDateTime: string;
}

interface RushCardType {
    title: string;
    description: string;
}

export interface GetTotalRushEventsResponse {
    serverDateTime: string;
    todayEventId: number;
    eventsStartDate: string;
    eventsEndDate: string;
    activePeriod: number;
    events: RushEventType[];
}

export interface GetRushUserParticipationStatusResponse {
    result: boolean;
}

export interface GetTodayRushEventResponse {
    leftOption: RushCardType;
    rightOption: RushCardType;
}

export type PostSelectedRushCardOptionResponse = 204 | 404;

export interface GetRushOptionResultResponse {
    resultTitle: string;
    resultDescription: string;
}

export interface GetRushBalanceResponse {
    optionId: number;
    leftOption: number;
    rightOption: number;
}

export interface GetRushResultResponse {
    leftSelection: number;
    rightSelection: number;
    rank: number;
    totalParticipants: number;
    winnerCount: number;
}

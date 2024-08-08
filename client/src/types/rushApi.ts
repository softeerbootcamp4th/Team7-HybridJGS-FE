interface RushEventType {
    rushEventId: number;
    startDateTime: string;
    endDateTime: string;
}

interface RushCardType {
    title: string;
    description: string;
}

// 밸런스 게임 전체 조회 : 서버 시간 연동 (GET) /event/rush
// (서버 시간) - (이벤트 시작 시간) => 카운트 다운 진행
export interface GetTotalRushEventsResponse {
    serverDateTime: string;
    todayEventId: number;
    eventsStartDate: string;
    eventsEndDate: string;
    activePeriod: number;
    events: RushEventType[];
}

// 밸런스 게임 참여 여부 조회 (GET) /event/rush/applied
export interface GetRushParticipationStatusResponse {
    result: boolean;
}

// 밸런스 게임 옵션 선택지 정보 조회 (GET) /event/rush/today
export interface GetTodayRushEventResponse {
    leftOption: RushCardType;
    rightOption: RushCardType;
}

// 밸런스 게임 옵션 선택 (응모) (POST) /event/rush/options/{optionId}/apply
export type PostSelectedRushCardOptionResponse = 204 | 404;

// 밸런스 게임 카드 선택 결과 (GET) /event/rush/options/{optionId}/result
export interface GetRushOptionResultResponse {
    resultTitle: string;
    resultDescription: string;
}

// 밸런스 게임 선택 비율 조회 (GET) /event/rush/balance
export interface GetRushBalanceResponse {
    optionId: number;
    leftOption: number;
    rightOption: number;
}

// 밸런스 게임 결과 조회 (GET) /event/rush/result
export interface GetRushResultResponse {
    leftSelection: number;
    rightSelection: number;
    rank: number;
    totalParticipants: number;
    winnerCount: number;
}

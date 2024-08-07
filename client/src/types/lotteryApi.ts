export interface CasperInformationType {
    eyeShape: number;
    eyePosition: number;
    mouthShape: number;
    color: number;
    sticker: number;
    name: string;
    expectation: string;
}

export type GetCasperListResponse = ({
    casperId: number;
} & CasperInformationType)[];

export interface PostCasperRequestBody extends CasperInformationType {}

export interface PostCasperResponse extends CasperInformationType {
    casperId: number;
}

export interface GetApplyCountResponse {
    appliedCount: number;
}

export type GetLotteryResponse = {
    lottery_event_id: number;
    start_date: string;
    end_date: string;
    winner_count: number;
}[];

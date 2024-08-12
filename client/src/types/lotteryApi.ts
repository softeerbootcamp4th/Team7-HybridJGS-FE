import { COOKIE_KEY } from "@/constants/cookie";

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

export interface PostCasperRequestBody extends CasperInformationType {
    [COOKIE_KEY.INVITE_USER]: string;
}

export interface PostCasperResponse extends CasperInformationType {
    casperId: number;
}

export interface GetApplyCountResponse {
    appliedCount: number;
    casperBot: CasperInformationType;
}

export interface GetLotteryResponse {
    eventStartDate: string;
    eventEndDate: string;
    activePeriod: number;
}

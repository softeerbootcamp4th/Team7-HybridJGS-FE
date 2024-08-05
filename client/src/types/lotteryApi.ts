interface CasperInformation {
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
} & CasperInformation)[];

export interface PostCasperRequestParam extends CasperInformation {}

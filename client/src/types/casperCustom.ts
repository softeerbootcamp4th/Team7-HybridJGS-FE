import { Dispatch } from "react";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";

export type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
type CasperFaceKeys = Exclude<CustomOptionType, typeof CUSTOM_OPTION.STICKER>;
type CasperFaceType = Record<CasperFaceKeys, number>;
export type SelectedCasperIdxType = CasperFaceType &
    Record<typeof CUSTOM_OPTION.STICKER, number | null>;

export interface CasperCustomStateType {
    selectedCasperIdx: SelectedCasperIdxType;
    casperName: string;
    expectations: string;
}

export const CASPER_ACTION = {
    SET_CASPER: "SET_CASPER",
    SET_CASPER_NAME: "SET_CASPER_NAME",
    SET_EXPECTATIONS: "SET_EXPECTATIONS",
    SELECT_OPTION: "SELECT_OPTION",
    SHUFFLE_CASPER: "SHUFFLE_CASPER",
    RESET_CUSTOM: "RESET_CUSTOM",
} as const;

export type CasperCustomAction =
    | {
          type: typeof CASPER_ACTION.SET_CASPER;
          payload: { option: SelectedCasperIdxType; casperName: string; expectations: string };
      }
    | { type: typeof CASPER_ACTION.SET_CASPER_NAME; payload: string }
    | { type: typeof CASPER_ACTION.SET_EXPECTATIONS; payload: string }
    | {
          type: typeof CASPER_ACTION.SELECT_OPTION;
          payload: { option: CustomOptionType; id: string };
      }
    | { type: typeof CASPER_ACTION.SHUFFLE_CASPER }
    | { type: typeof CASPER_ACTION.RESET_CUSTOM };

export type CasperCustomDispatchType = Dispatch<CasperCustomAction>;

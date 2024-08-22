import { Dispatch } from "react";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";

type CasperFaceKeys = Exclude<CUSTOM_OPTION, CUSTOM_OPTION.STICKER>;
type CasperFaceType = Record<CasperFaceKeys, number>;
export type SelectedCasperIdxType = CasperFaceType & Record<CUSTOM_OPTION.STICKER, number | null>;

export interface CasperCustomStateType {
    selectedCasperIdx: SelectedCasperIdxType;
    casperName: string;
    expectations: string;
}

export const enum CASPER_ACTION {
    SET_CASPER = "SET_CASPER",
    SET_CASPER_NAME = "SET_CASPER_NAME",
    SET_EXPECTATIONS = "SET_EXPECTATIONS",
    SELECT_OPTION = "SELECT_OPTION",
    SHUFFLE_CASPER = "SHUFFLE_CASPER",
    RESET_CUSTOM = "RESET_CUSTOM",
}

export type CasperCustomAction =
    | {
          type: CASPER_ACTION.SET_CASPER;
          payload: { option: SelectedCasperIdxType; casperName: string; expectations: string };
      }
    | { type: CASPER_ACTION.SET_CASPER_NAME; payload: string }
    | { type: CASPER_ACTION.SET_EXPECTATIONS; payload: string }
    | {
          type: CASPER_ACTION.SELECT_OPTION;
          payload: { option: CUSTOM_OPTION; id: string };
      }
    | { type: CASPER_ACTION.SHUFFLE_CASPER }
    | { type: CASPER_ACTION.RESET_CUSTOM };

export type CasperCustomDispatchType = Dispatch<CasperCustomAction>;

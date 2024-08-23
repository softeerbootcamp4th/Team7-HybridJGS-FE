import { SelectedCasperIdxType } from "./casperCustom";

export interface CasperCardType {
    id: number;
    casperName: string;
    expectations: string;
    selectedCasperIdx: SelectedCasperIdxType;
}

import { Dispatch, ReactNode, createContext, useState } from "react";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_MAX_COUNT } from "@/constants/CasperCustom/casper";
import { getRandomInt } from "@/utils/getRandomInt";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
type CasperFaceKeys = Exclude<CustomOptionType, typeof CUSTOM_OPTION.STICKER>;
type CasperFaceType = Record<CasperFaceKeys, number>;
export type SelectedCasperIdxType = CasperFaceType &
    Record<typeof CUSTOM_OPTION.STICKER, number | null>;

export interface CasperCustomContextType {
    selectedCasperIdx: SelectedCasperIdxType;
    casperName: string;
    setCasperName: Dispatch<string>;
    expectations: string;
    setExpectations: Dispatch<string>;
    handleSelectOption: (option: CustomOptionType, id: string) => void;
    handleShuffleCasper: () => void;
    handleResetCustom: () => void;
}

export const CasperCustomContext = createContext<CasperCustomContextType | null>(null);

const INITIAL_INDEX = 0;

export const CasperCustomProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCasperIdx, setSelectedCasperIdx] = useState<SelectedCasperIdxType>({
        [CUSTOM_OPTION.EYES]: INITIAL_INDEX,
        [CUSTOM_OPTION.EYES_DIRECTION]: INITIAL_INDEX,
        [CUSTOM_OPTION.MOUTH]: INITIAL_INDEX,
        [CUSTOM_OPTION.COLOR]: INITIAL_INDEX,
        [CUSTOM_OPTION.STICKER]: null,
    });
    const [casperName, setCasperName] = useState<string>("");
    const [expectations, setExpectations] = useState<string>("");

    const handleSelectOption = (option: CustomOptionType, id: string) => {
        const selectedIdx = CASPER_OPTION[option].findIndex((opt) => opt.id === id);

        if (selectedIdx !== -1) {
            setSelectedCasperIdx({ ...selectedCasperIdx, [option]: selectedIdx });
        }
    };

    const handleShuffleCasper = () => {
        setSelectedCasperIdx({
            ...selectedCasperIdx,
            [CUSTOM_OPTION.EYES]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.EYES]),
            [CUSTOM_OPTION.EYES_DIRECTION]: getRandomInt(
                OPTION_MAX_COUNT[CUSTOM_OPTION.EYES_DIRECTION]
            ),
            [CUSTOM_OPTION.MOUTH]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.MOUTH]),
            [CUSTOM_OPTION.COLOR]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.COLOR]),
        });
    };

    const handleResetCustom = () => {
        setSelectedCasperIdx({
            [CUSTOM_OPTION.EYES]: INITIAL_INDEX,
            [CUSTOM_OPTION.EYES_DIRECTION]: INITIAL_INDEX,
            [CUSTOM_OPTION.MOUTH]: INITIAL_INDEX,
            [CUSTOM_OPTION.COLOR]: INITIAL_INDEX,
            [CUSTOM_OPTION.STICKER]: null,
        });
        setCasperName("");
        setExpectations("");
    };

    return (
        <CasperCustomContext.Provider
            value={{
                selectedCasperIdx,
                casperName,
                setCasperName,
                expectations,
                setExpectations,
                handleSelectOption,
                handleShuffleCasper,
                handleResetCustom,
            }}
        >
            {children}
        </CasperCustomContext.Provider>
    );
};

import { ReactNode, createContext, useState } from "react";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_MAX_COUNT } from "@/constants/CasperCustom/casper";
import { getRandomInt } from "@/utils/getRandomInt";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
type CasperFaceKeys = Exclude<CustomOptionType, typeof CUSTOM_OPTION.STICKER>;
type CasperFaceType = Record<CasperFaceKeys, number>;
type SelectedCasperIdxType = CasperFaceType & Record<typeof CUSTOM_OPTION.STICKER, number | null>;

export interface CasperCustomContextType {
    selectedCasperIdx: SelectedCasperIdxType;
    handleSelectOption: (option: CustomOptionType, id: string) => void;
    handleShuffleCasper: () => void;
}

export const CasperCustomContext = createContext<CasperCustomContextType | null>(null);

export const CasperCustomProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCasperIdx, setSelectedCasperIdx] = useState<SelectedCasperIdxType>({
        [CUSTOM_OPTION.EYES]: 0,
        [CUSTOM_OPTION.EYES_DIRECTION]: 0,
        [CUSTOM_OPTION.MOUTH]: 0,
        [CUSTOM_OPTION.COLOR]: 0,
        [CUSTOM_OPTION.STICKER]: null,
    });

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

    return (
        <CasperCustomContext.Provider
            value={{
                selectedCasperIdx,
                handleSelectOption,
                handleShuffleCasper,
            }}
        >
            {children}
        </CasperCustomContext.Provider>
    );
};

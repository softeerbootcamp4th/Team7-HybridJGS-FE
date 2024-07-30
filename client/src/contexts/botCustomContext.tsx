import { ReactNode, createContext, useState } from "react";
import { CUSTOM_OPTION } from "@/constants/BotCustom/casper";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
type SelectedBotIdxType = {
    [CUSTOM_OPTION.EYES]: number;
    [CUSTOM_OPTION.EYES_DIRECTION]: number;
    [CUSTOM_OPTION.MOUTH]: number;
    [CUSTOM_OPTION.COLOR]: number;
    [CUSTOM_OPTION.STICKER]: number | null;
};

export interface BotCustomContextType {
    selectedBotIdx: SelectedBotIdxType;
    handleSelectOption: (option: CustomOptionType, idx: number) => void;
}

export const BotCustomContext = createContext<BotCustomContextType | null>(null);

export const BotCustomProvider = ({ children }: { children: ReactNode }) => {
    const [selectedBotIdx, setSelectedBotIdx] = useState<SelectedBotIdxType>({
        [CUSTOM_OPTION.EYES]: 0,
        [CUSTOM_OPTION.EYES_DIRECTION]: 0,
        [CUSTOM_OPTION.MOUTH]: 0,
        [CUSTOM_OPTION.COLOR]: 0,
        [CUSTOM_OPTION.STICKER]: null,
    });

    const handleSelectOption = (option: CustomOptionType, idx: number) => {
        setSelectedBotIdx({ ...selectedBotIdx, [option]: idx });
    };

    return (
        <BotCustomContext.Provider
            value={{
                selectedBotIdx,
                handleSelectOption,
            }}
        >
            {children}
        </BotCustomContext.Provider>
    );
};

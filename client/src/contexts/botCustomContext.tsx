import { ReactNode, createContext, useState } from "react";
import { CUSTOM_OPTION, OPTION_MAX_COUNT } from "@/constants/BotCustom/casper";
import { getRandomInt } from "@/utils/getRandomInt";

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
    handleShuffleBot: () => void;
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

    const handleShuffleBot = () => {
        setSelectedBotIdx({
            ...selectedBotIdx,
            [CUSTOM_OPTION.EYES]: getRandomInt(0, OPTION_MAX_COUNT[CUSTOM_OPTION.EYES]),
            [CUSTOM_OPTION.EYES_DIRECTION]: getRandomInt(
                0,
                OPTION_MAX_COUNT[CUSTOM_OPTION.EYES_DIRECTION]
            ),
            [CUSTOM_OPTION.MOUTH]: getRandomInt(0, OPTION_MAX_COUNT[CUSTOM_OPTION.MOUTH]),
            [CUSTOM_OPTION.COLOR]: getRandomInt(0, OPTION_MAX_COUNT[CUSTOM_OPTION.COLOR]),
        });
    };

    return (
        <BotCustomContext.Provider
            value={{
                selectedBotIdx,
                handleSelectOption,
                handleShuffleBot,
            }}
        >
            {children}
        </BotCustomContext.Provider>
    );
};

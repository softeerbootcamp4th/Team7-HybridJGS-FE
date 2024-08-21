import { useCallback, useEffect } from "react";
import { cva } from "class-variance-authority";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_TYPE } from "@/constants/CasperCustom/casper";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import { CustomOptionImageItem } from "./CustomOptionImageItem";
import { EyesPanel as EyesPanelComponent } from "./EyesPanel";
import { SharedPanel } from "./SharedPanel";

interface GetCustomOptionImageItemProps {
    optionId: string;
    isSelected: boolean;
    handleClickOption: (id: string) => void;
}

function getCustomOptionImageItem({
    optionId,
    isSelected,
    handleClickOption,
}: GetCustomOptionImageItemProps) {
    return {
        id: optionId,
        component: (
            <CustomOptionImageItem
                key={optionId}
                optionId={optionId}
                selected={isSelected}
                handleClickOption={handleClickOption}
            />
        ),
    };
}

interface GetFilteredOptionsProps {
    optionType: OPTION_TYPE;
    options: (typeof CASPER_OPTION)[keyof typeof CASPER_OPTION];
    selectedOptionId?: string;
    handleClickOption: (optionId: string) => void;
}
function getFilteredOptions({
    optionType,
    options,
    selectedOptionId,
    handleClickOption,
}: GetFilteredOptionsProps) {
    return options
        .filter((option) => option.type === optionType)
        .map((option) =>
            getCustomOptionImageItem({
                optionId: option.id,
                isSelected: selectedOptionId === option.id || false,
                handleClickOption,
            })
        );
}

export function EyesPanel() {
    return <EyesPanelComponent />;
}

export function MouthPanel() {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const mouthOptions = CASPER_OPTION[CUSTOM_OPTION.MOUTH];
    const mouthSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.MOUTH];
    const mouthSelectedOption = mouthOptions[mouthSelectedIdx];

    const handleDispatchOption = useCallback((id: string) => {
        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.MOUTH, id },
        });
    }, []);

    const mouthLimited = getFilteredOptions({
        optionType: OPTION_TYPE.LIMITED,
        options: mouthOptions,
        selectedOptionId: mouthSelectedOption?.id,
        handleClickOption: handleDispatchOption,
    });
    const mouthBasic = getFilteredOptions({
        optionType: OPTION_TYPE.BASIC,
        options: mouthOptions,
        selectedOptionId: mouthSelectedOption?.id,
        handleClickOption: handleDispatchOption,
    });

    return (
        <SharedPanel
            selectedPanel={CUSTOM_OPTION.MOUTH}
            limitedOptions={mouthLimited}
            basicOptions={mouthBasic}
        />
    );
}

const colorVariants = cva(`rounded-1000 border-[2px] w-[72px] h-[72px] cursor-pointer`, {
    variants: {
        selected: {
            true: "border-s-red",
            false: "border-transparent",
        },
    },
});
export function ColorPanel() {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const colorOptions = CASPER_OPTION[CUSTOM_OPTION.COLOR];
    const colorSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.COLOR];
    const colorSelectedOption = colorOptions[colorSelectedIdx];

    const handleDispatchOption = useCallback((id: string) => {
        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.COLOR, id },
        });
    }, []);

    const colorLimited = colorOptions
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <div
                        className={colorVariants({
                            selected: colorSelectedOption?.id === option.id || false,
                        })}
                        style={{ backgroundColor: option.id }}
                        onClick={() => handleDispatchOption(option.id)}
                    />
                ),
            };
        });
    const colorBasic = colorOptions
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <div
                        className={colorVariants({
                            selected: colorSelectedOption?.id === option.id || false,
                        })}
                        style={{ backgroundColor: option.id }}
                        onClick={() => handleDispatchOption(option.id)}
                    />
                ),
            };
        });

    return (
        <SharedPanel
            selectedPanel={CUSTOM_OPTION.COLOR}
            limitedOptions={colorLimited}
            basicOptions={colorBasic}
        />
    );
}

export function StickerPanel() {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const stickerOptions = CASPER_OPTION[CUSTOM_OPTION.STICKER];
    const stickerSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.STICKER];
    const stickerSelectedOption =
        stickerSelectedIdx !== null ? stickerOptions[stickerSelectedIdx] : null;

    useEffect(() => {
        if (stickerOptions.length === 0 || stickerSelectedOption !== null) {
            return;
        }

        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.STICKER, id: stickerOptions[0].id },
        });
    }, []);

    const handleDispatchOption = useCallback((id: string) => {
        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.STICKER, id },
        });
    }, []);

    const stickerLimited = getFilteredOptions({
        optionType: OPTION_TYPE.LIMITED,
        options: stickerOptions,
        selectedOptionId: stickerSelectedOption?.id,
        handleClickOption: handleDispatchOption,
    });
    const stickerBasic = getFilteredOptions({
        optionType: OPTION_TYPE.BASIC,
        options: stickerOptions,
        selectedOptionId: stickerSelectedOption?.id,
        handleClickOption: handleDispatchOption,
    });

    return (
        <SharedPanel
            selectedPanel={CUSTOM_OPTION.STICKER}
            limitedOptions={stickerLimited}
            basicOptions={stickerBasic}
        />
    );
}

import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_TYPE } from "@/constants/CasperCustom/casper";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CustomOptionImageItem from "./CustomOptionImageItem";
import EyesPanelComponent from "./EyesPanel";
import SharedPanel from "./SharedPanel";

interface GetCustomOptionImageItemProps {
    optionId: string;
    isSelected: boolean;
    handleClickOption: () => void;
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

export function EyesPanel() {
    return <EyesPanelComponent />;
}

export function MouthPanel() {
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();

    const mouthOptions = CASPER_OPTION[CUSTOM_OPTION.MOUTH];
    const mouthSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.MOUTH];
    const mouthSelectedOption = mouthOptions[mouthSelectedIdx];

    const mouthLimited = mouthOptions
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) =>
            getCustomOptionImageItem({
                optionId: option.id,
                isSelected: mouthSelectedOption?.id === option.id || false,
                handleClickOption: () => handleSelectOption(CUSTOM_OPTION.MOUTH, option.id),
            })
        );
    const mouthBasic = mouthOptions
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) =>
            getCustomOptionImageItem({
                optionId: option.id,
                isSelected: mouthSelectedOption?.id === option.id || false,
                handleClickOption: () => handleSelectOption(CUSTOM_OPTION.MOUTH, option.id),
            })
        );

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
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();

    const colorOptions = CASPER_OPTION[CUSTOM_OPTION.COLOR];
    const colorSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.COLOR];
    const colorSelectedOption = colorOptions[colorSelectedIdx];

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
                        onClick={() => handleSelectOption(CUSTOM_OPTION.COLOR, option.id)}
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
                        onClick={() => handleSelectOption(CUSTOM_OPTION.COLOR, option.id)}
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
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();

    const stickerOptions = CASPER_OPTION[CUSTOM_OPTION.STICKER];
    const stickerSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.STICKER];
    const stickerSelectedOption =
        stickerSelectedIdx !== null ? stickerOptions[stickerSelectedIdx] : null;

    useEffect(() => {
        if (stickerOptions.length === 0 || stickerSelectedOption !== null) {
            return;
        }

        handleSelectOption(CUSTOM_OPTION.STICKER, stickerOptions[0].id);
    }, []);

    const stickerLimited = stickerOptions
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) =>
            getCustomOptionImageItem({
                optionId: option.id,
                isSelected: stickerSelectedOption?.id === option.id || false,
                handleClickOption: () => handleSelectOption(CUSTOM_OPTION.STICKER, option.id),
            })
        );
    const stickerBasic = stickerOptions
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) =>
            getCustomOptionImageItem({
                optionId: option.id,
                isSelected: stickerSelectedOption?.id === option.id || false,
                handleClickOption: () => handleSelectOption(CUSTOM_OPTION.STICKER, option.id),
            })
        );

    return (
        <SharedPanel
            selectedPanel={CUSTOM_OPTION.STICKER}
            limitedOptions={stickerLimited}
            basicOptions={stickerBasic}
        />
    );
}

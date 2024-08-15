import { memo } from "react";
import { cva } from "class-variance-authority";
import {
    CASPER_CARD_SIZE,
    CASPER_MOUTH_SIZE,
    CASPER_OPTION,
    CASPER_SIZE,
    CASPER_SIZE_OPTION,
    CASPER_Z_INDEX,
    COLOR_BACKGROUND_MAP,
    CUSTOM_OPTION,
} from "@/constants/CasperCustom/casper";
import { SelectedCasperIdxType } from "@/types/casperCustom";
import { getCasperEyesComponent } from "@/utils/CasperCustom/getCasperEyesComponent";
import { getCasperMouthComponent } from "@/utils/CasperCustom/getCasperMouthComponent";
import CasperEyesLayout from "/public/assets/casper-custom/eyes/layout.svg?react";
import CasperFace from "/public/assets/casper-custom/face.svg?react";

interface CasperCardFrontUIProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    optionDescription?: string;
    casperName?: string;
    hasRandomButton?: boolean;
    selectedCasperIdx: SelectedCasperIdxType;
    handleShuffleCasper?: () => void;
}

const casperCardContainerVariants = cva(`relative`, {
    variants: {
        size: {
            [CASPER_SIZE_OPTION.LG]: "rounded-800",
            [CASPER_SIZE_OPTION.SM]: "rounded-700",
        },
    },
});

const casperNameVariants = cva(
    `absolute flex justify-center items-center bottom-0 w-full bg-n-white text-n-black`,
    {
        variants: {
            size: {
                [CASPER_SIZE_OPTION.LG]: "h-heading-3-bold rounded-b-800",
                [CASPER_SIZE_OPTION.SM]: "h-body-1-bold rounded-b-700",
            },
        },
    }
);

function CasperCardFrontUI({
    size = CASPER_SIZE_OPTION.LG,
    optionDescription,
    casperName,
    hasRandomButton = true,
    selectedCasperIdx,
    handleShuffleCasper,
}: CasperCardFrontUIProps) {
    const {
        [CUSTOM_OPTION.EYES]: selectedEyesIdx,
        [CUSTOM_OPTION.EYES_DIRECTION]: selectedEyesDirectionIdx,
        [CUSTOM_OPTION.MOUTH]: selectedMouthIdx,
        [CUSTOM_OPTION.COLOR]: selectedColorIdx,
        [CUSTOM_OPTION.STICKER]: selectedStickerIdx,
    } = selectedCasperIdx;

    const selectedEyes = CASPER_OPTION[CUSTOM_OPTION.EYES][selectedEyesIdx];
    const selectedEyesDirection =
        CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION][selectedEyesDirectionIdx];
    const selectedMouth = CASPER_OPTION[CUSTOM_OPTION.MOUTH][selectedMouthIdx];
    const selectedColor = CASPER_OPTION[CUSTOM_OPTION.COLOR][selectedColorIdx];

    const { CARD_WIDTH, CARD_HEIGHT } = CASPER_CARD_SIZE[size];
    const {
        CASPER_WIDTH,
        CASPER_HEIGHT,
        CASPER_TOP,
        EYES_WIDTH,
        EYES_HEIGHT,
        EYES_TOP,
        BOTTOM_BAR_HEIGHT,
    } = CASPER_SIZE[size];
    const { WIDTH: MOUTH_WIDTH, TOP: MOUTH_TOP } = CASPER_MOUTH_SIZE[size][selectedMouth.id];

    const CasperEyesSvgComponent = getCasperEyesComponent(
        selectedEyes.id,
        selectedEyesDirection.id
    );
    const CasperMouthSvgComponent = getCasperMouthComponent(selectedMouth.id);

    return (
        <div
            className={casperCardContainerVariants({
                size,
            })}
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: COLOR_BACKGROUND_MAP[selectedColorIdx],
            }}
        >
            <div
                className="relative left-[50%] translate-x-[-50%]"
                style={{
                    top: CASPER_TOP,
                    width: CASPER_WIDTH,
                    height: CASPER_HEIGHT,
                    zIndex: CASPER_Z_INDEX.CASPER,
                }}
            >
                <CasperFace
                    fill={selectedColor.id}
                    className="absolute top-0"
                    width={CASPER_WIDTH}
                    height={CASPER_HEIGHT}
                />
                <div
                    className="absolute top-0"
                    style={{ width: CASPER_WIDTH, height: CASPER_HEIGHT }}
                >
                    <CasperEyesLayout
                        className="absolute left-[50%] translate-x-[-50%]"
                        fill={selectedColor.isDarkMode ? "#ffffff" : "#000000"}
                        style={{
                            top: EYES_TOP,
                            width: EYES_WIDTH,
                            height: EYES_HEIGHT,
                        }}
                    />
                    {CasperEyesSvgComponent && (
                        <CasperEyesSvgComponent
                            className="absolute left-[50%] translate-x-[-50%]"
                            fill={selectedColor.id}
                            style={{
                                top: EYES_TOP,
                                width: EYES_WIDTH,
                                height: EYES_HEIGHT,
                            }}
                        />
                    )}
                    {CasperMouthSvgComponent && (
                        <CasperMouthSvgComponent
                            className="absolute left-[50%] translate-x-[-50%]"
                            fill={selectedColor.isDarkMode ? "#ffffff" : "#000000"}
                            style={{
                                top: MOUTH_TOP,
                                width: MOUTH_WIDTH,
                            }}
                        />
                    )}
                </div>
            </div>

            {selectedStickerIdx !== null && (
                <img
                    alt="캐스퍼 일렉트릭 봇 스티커"
                    className="absolute top-0"
                    src={`/assets/casper-custom/sticker/${CASPER_OPTION[CUSTOM_OPTION.STICKER][selectedStickerIdx].id}.png`}
                    style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        zIndex: CASPER_OPTION[CUSTOM_OPTION.STICKER][selectedStickerIdx]["z-index"],
                    }}
                />
            )}

            {hasRandomButton && (
                <button
                    className="bg-n-white/[.2] rounded-800 absolute right-[24px] top-[24px] w-[42px] h-[42px]"
                    style={{ zIndex: CASPER_Z_INDEX.UPPER_CASPER }}
                    onClick={handleShuffleCasper}
                >
                    <img
                        alt="캐스퍼 일렉트릭 봇 랜덤화"
                        className="p-300"
                        src="/assets/casper-custom/shuffle.svg"
                    />
                </button>
            )}

            {optionDescription && (
                <div
                    className="absolute bottom-[48px] left-[50%] translate-x-[-50%] py-300 px-500 h-body-1-regular text-n-white rounded-700 bg-n-white/[.16] border border-n-white text-nowrap"
                    style={{ zIndex: CASPER_Z_INDEX.UPPER_CASPER }}
                >
                    {optionDescription}
                </div>
            )}

            {casperName && (
                <div
                    className={casperNameVariants({ size })}
                    style={{ height: BOTTOM_BAR_HEIGHT, zIndex: CASPER_Z_INDEX.UPPER_CASPER }}
                >
                    {casperName}
                </div>
            )}
        </div>
    );
}

const MemoizedCasperCardFrontUI = memo(CasperCardFrontUI);
export { MemoizedCasperCardFrontUI as CasperCardFrontUI };

import { cva } from "class-variance-authority";
import {
    CASPER_CARD_SIZE,
    CASPER_OPTION,
    CASPER_SIZE_OPTION,
    COLOR_BACKGROUND_MAP,
    CUSTOM_OPTION,
    MINI_CASPER_MOUTH_SIZE,
    MINI_CASPER_SIZE,
} from "@/constants/CasperCustom/casper";
import { SelectedCasperIdxType } from "@/types/casperCustom";
import { getCasperEyesComponent } from "@/utils/CasperCustom/getCasperEyesComponent";
import { getCasperMouthComponent } from "@/utils/CasperCustom/getCasperMouthComponent";
import CasperEyesLayout from "/public/assets/casper-custom/eyes/layout.svg?react";
import CasperFace from "/public/assets/casper-custom/face.svg?react";
import HyundaiLogo from "/public/assets/hyundai-logo.svg?react";

interface CasperCardBackUIProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    casperName: string;
    expectations?: string;
    selectedCasperIdx: SelectedCasperIdxType;
}

const casperCardContainerVariants = cva(`relative`, {
    variants: {
        size: {
            [CASPER_SIZE_OPTION.LG]: "rounded-800",
            [CASPER_SIZE_OPTION.SM]: "rounded-700",
        },
    },
});

const casperLogoVariants = cva(
    `absolute flex justify-center items-center gap-300 bottom-0 w-full bg-n-white text-n-black`,
    {
        variants: {
            size: {
                [CASPER_SIZE_OPTION.LG]: "h-body-2-bold rounded-b-800",
                [CASPER_SIZE_OPTION.SM]: "h-detail-1-bold rounded-b-700",
            },
        },
    }
);

const INNER_STYLE = {
    [CASPER_SIZE_OPTION.LG]: {
        LOGO_SIZE: 101,
        OUTER_GAP: "gap-800",
        INNER_GAP: "gap-500",
        TITLE_TEXT: "h-heading-3-bold",
        DESCRIPTION_TEXT: "h-body-1-regular",
    },
    [CASPER_SIZE_OPTION.SM]: {
        LOGO_SIZE: 80,
        OUTER_GAP: "gap-500",
        INNER_GAP: "gap-300",
        TITLE_TEXT: "h-body-1-bold",
        DESCRIPTION_TEXT: "h-body-2-regular",
    },
};

export default function CasperCardBackUI({
    size = CASPER_SIZE_OPTION.LG,
    casperName,
    expectations,
    selectedCasperIdx,
}: CasperCardBackUIProps) {
    const {
        [CUSTOM_OPTION.EYES]: selectedEyesIdx,
        [CUSTOM_OPTION.EYES_DIRECTION]: selectedEyesDirectionIdx,
        [CUSTOM_OPTION.MOUTH]: selectedMouthIdx,
        [CUSTOM_OPTION.COLOR]: selectedColorIdx,
    } = selectedCasperIdx;

    const selectedEyes = CASPER_OPTION[CUSTOM_OPTION.EYES][selectedEyesIdx];
    const selectedEyesDirection =
        CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION][selectedEyesDirectionIdx];
    const selectedMouth = CASPER_OPTION[CUSTOM_OPTION.MOUTH][selectedMouthIdx];
    const selectedColor = CASPER_OPTION[CUSTOM_OPTION.COLOR][selectedColorIdx];

    const { CARD_WIDTH, CARD_HEIGHT } = CASPER_CARD_SIZE[size];
    const { CASPER_WIDTH, CASPER_HEIGHT, EYES_WIDTH, EYES_HEIGHT, EYES_TOP, BOTTOM_BAR_HEIGHT } =
        MINI_CASPER_SIZE[size];
    const { WIDTH: MOUTH_WIDTH, TOP: MOUTH_TOP } = MINI_CASPER_MOUTH_SIZE[size][selectedMouth.id];

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
                backgroundColor: COLOR_BACKGROUND_MAP[selectedCasperIdx[CUSTOM_OPTION.COLOR]],
            }}
        >
            <div
                className={`flex flex-col items-center justify-center ${INNER_STYLE[size].OUTER_GAP}`}
                style={{ height: CARD_HEIGHT - BOTTOM_BAR_HEIGHT }}
            >
                <div className={`flex flex-col items-center ${INNER_STYLE[size].INNER_GAP}`}>
                    <div
                        className="relative"
                        style={{
                            width: CASPER_WIDTH,
                            height: CASPER_HEIGHT,
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

                    <h3 className={`text-n-black ${INNER_STYLE[size].TITLE_TEXT}`}>{casperName}</h3>
                </div>

                {expectations && (
                    <div
                        className={`flex flex-col items-center ${INNER_STYLE[size].INNER_GAP} ${INNER_STYLE[size].DESCRIPTION_TEXT}`}
                        style={{ width: CARD_WIDTH - 100 }}
                    >
                        <p className="text-n-neutral-500">작성한 기대평</p>
                        <p className="text-n-black">{expectations}</p>
                    </div>
                )}

                <div className={casperLogoVariants({ size })} style={{ height: BOTTOM_BAR_HEIGHT }}>
                    <HyundaiLogo fill="#003468" width={INNER_STYLE[size].LOGO_SIZE} height={24} />
                    <div className="border-l border-n-neutral-500 h-3" />
                    <p>CASPER Electric</p>
                </div>
            </div>
        </div>
    );
}

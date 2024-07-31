import { cva } from "class-variance-authority";
import {
    CASPER_OPTION,
    CASPER_SIZE_OPTION,
    COLOR_BACKGROUND_MAP,
    CUSTOM_OPTION,
    MINI_CASPER_MOUTH_SIZE,
    MINI_CASPER_SIZE,
} from "@/constants/BotCustom/casper";
import useBotCustomContext from "@/hooks/useBotCustomContext";
import { getCasperEyesComponent } from "@/utils/getCasperEyesComponent";
import { getCasperMouthComponent } from "@/utils/getCasperMouthComponent";
import CasperEyesLayout from "/public/assets/bot-custom/eyes/layout.svg?react";
import CasperFace from "/public/assets/bot-custom/face.svg?react";
import HyundaiLogo from "/public/assets/hyundai-logo.svg?react";

interface CasperCardBackProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    casperName: string;
    expectations?: string;
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
    `absolute flex justify-center items-center gap-300 bottom-0 w-[100%] bg-n-white text-n-black`,
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

export default function CasperCardBack({
    size = CASPER_SIZE_OPTION.LG,
    casperName,
    expectations,
}: CasperCardBackProps) {
    const { selectedBotIdx } = useBotCustomContext();

    const selectedColor = CASPER_OPTION[CUSTOM_OPTION.COLOR][selectedBotIdx[CUSTOM_OPTION.COLOR]];
    const selectedEyes = CASPER_OPTION[CUSTOM_OPTION.EYES][selectedBotIdx[CUSTOM_OPTION.EYES]];
    const selectedEyesDirection =
        CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION][selectedBotIdx[CUSTOM_OPTION.EYES_DIRECTION]];
    const selectedMouth = CASPER_OPTION[CUSTOM_OPTION.MOUTH][selectedBotIdx[CUSTOM_OPTION.MOUTH]];

    const {
        CARD_WIDTH,
        CARD_HEIGHT,
        CASPER_WIDTH,
        CASPER_HEIGHT,
        EYES_WIDTH,
        EYES_HEIGHT,
        EYES_TOP,
        BOTTOM_BAR_HEIGHT,
    } = MINI_CASPER_SIZE[size];
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
                backgroundColor: COLOR_BACKGROUND_MAP[selectedBotIdx[CUSTOM_OPTION.COLOR]],
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
                    <div className="border-l border-n-neutral-500 h-[12px]" />
                    <p>CASPER Electric</p>
                </div>
            </div>
        </div>
    );
}

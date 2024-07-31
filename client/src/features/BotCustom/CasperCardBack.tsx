import { cva } from "class-variance-authority";
import {
    CASPER_MOUTH_SIZE,
    CASPER_OPTION,
    CASPER_SIZE,
    CASPER_SIZE_OPTION,
    COLOR_BACKGROUND_MAP,
    CUSTOM_OPTION,
} from "@/constants/BotCustom/casper";
import useBotCustomContext from "@/hooks/useBotCustomContext";
import { getCasperEyesComponent } from "@/utils/getCasperEyesComponent";
import { getCasperMouthComponent } from "@/utils/getCasperMouthComponent";

interface CasperCardBackProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    casperName: string;
    expectations: string;
}

const casperCardContainerVariants = cva(`relative`, {
    variants: {
        size: {
            [CASPER_SIZE_OPTION.LG]: "w-[384px] h-[500px] rounded-800",
            [CASPER_SIZE_OPTION.SM]: "w-[288px] h-[375px] rounded-700",
        },
    },
});

export default function CasperCardBack({
    size = CASPER_SIZE_OPTION.LG,
    casperName,
    expectations,
}: CasperCardBackProps) {
    const { selectedBotIdx, handleShuffleBot } = useBotCustomContext();

    const selectedColor = CASPER_OPTION[CUSTOM_OPTION.COLOR][selectedBotIdx[CUSTOM_OPTION.COLOR]];
    const selectedEyes = CASPER_OPTION[CUSTOM_OPTION.EYES][selectedBotIdx[CUSTOM_OPTION.EYES]];
    const selectedEyesDirection =
        CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION][selectedBotIdx[CUSTOM_OPTION.EYES_DIRECTION]];
    const selectedMouth = CASPER_OPTION[CUSTOM_OPTION.MOUTH][selectedBotIdx[CUSTOM_OPTION.MOUTH]];
    const selectedStickerIdx = selectedBotIdx[CUSTOM_OPTION.STICKER];

    const {
        CASPER_WIDTH,
        CASPER_HEIGHT,
        CASPER_TOP,
        EYES_WIDTH,
        EYES_HEIGHT,
        EYES_TOP,
        CARD_WIDTH,
        CARD_HEIGHT,
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
            style={{ backgroundColor: COLOR_BACKGROUND_MAP[selectedBotIdx[CUSTOM_OPTION.COLOR]] }}
        >
            <h3 className="h-heading-3-bold text-n-black absolute top-[176px] left-[50%] translate-x-[-50%]">
                {casperName}
            </h3>

            <div className="absolute top-[244px] h-body-1-regular">
                <p>작성한 기대평</p>
            </div>
        </div>
    );
}

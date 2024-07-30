import { cva } from "class-variance-authority";
import { CASPER_OPTION, COLOR_BACKGROUND_MAP, CUSTOM_OPTION } from "@/constants/BotCustom/casper";
import { useBotCustom } from "@/hooks/useBotCustom";
import CasperFace from "/public/assets/bot-custom/face.svg?react";

const CASPER_SIZE_OPTION = {
    LG: "lg",
    SM: "sm",
};
interface CasperCardProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
}

const casperCardContainerVariants = cva(`relative`, {
    variants: {
        size: {
            [CASPER_SIZE_OPTION.LG]: "w-[384px] h-[500px] rounded-800",
            [CASPER_SIZE_OPTION.SM]: "w-[288px] h-[375px] rounded-700",
        },
    },
});

const CASPER_SIZE = {
    [CASPER_SIZE_OPTION.LG]: {
        CARD_WIDTH: 384,
        CARD_HEIGHT: 500,
        CASPER_WIDTH: 260,
        CASPER_HEIGHT: 170,
        CASPER_TOP: 148,
        EYES_WIDTH: 216,
        EYES_HEIGHT: 70,
        EYES_TOP: 180,
        MOUTH_WIDTH: 170,
        MOUTH_HEIGHT: 34,
        MOUTH_TOP: 254,
    },
    [CASPER_SIZE_OPTION.SM]: {
        CARD_WIDTH: 288,
        CARD_HEIGHT: 375,
        CASPER_WIDTH: 196,
        CASPER_HEIGHT: 128,
        CASPER_TOP: 112,
        EYES_WIDTH: 162,
        EYES_HEIGHT: 53,
        EYES_TOP: 134,
        MOUTH_WIDTH: 128,
        MOUTH_HEIGHT: 26,
        MOUTH_TOP: 192,
    },
};

export default function CasperCard({ size = CASPER_SIZE_OPTION.LG }: CasperCardProps) {
    const { selectedBotIdx, handleShuffleBot } = useBotCustom();

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
        MOUTH_TOP,
        MOUTH_WIDTH,
        MOUTH_HEIGHT,
        CARD_WIDTH,
        CARD_HEIGHT,
    } = CASPER_SIZE[size];

    return (
        <div
            className={casperCardContainerVariants({
                size,
            })}
            style={{ backgroundColor: COLOR_BACKGROUND_MAP[selectedBotIdx[CUSTOM_OPTION.COLOR]] }}
        >
            <CasperFace
                fill={selectedColor.id}
                className="absolute left-[50%] translate-x-[-50%]"
                width={CASPER_WIDTH}
                height={CASPER_HEIGHT}
                style={{
                    top: CASPER_TOP,
                }}
            />
            <img
                alt="캐스퍼 일렉트릭 봇 눈"
                src={`/assets/bot-custom/eyes/${selectedEyes.id}-${selectedEyesDirection.id}.png`}
                className="absolute left-[50%] translate-x-[-50%]"
                style={{
                    top: EYES_TOP,
                    width: EYES_WIDTH,
                    height: EYES_HEIGHT,
                }}
            />
            <img
                alt="캐스퍼 일렉트릭 봇 입"
                src={`/assets/bot-custom/mouth/${selectedMouth.id}.png`}
                className="absolute left-[50%] translate-x-[-50%]"
                style={{
                    top: MOUTH_TOP,
                    width: MOUTH_WIDTH,
                }}
            />
            {selectedStickerIdx !== null && (
                <img
                    alt="캐스퍼 일렉트릭 봇 스티커"
                    className={`${CASPER_OPTION[CUSTOM_OPTION.STICKER][selectedStickerIdx].position}`}
                    src={`/assets/bot-custom/sticker/${CASPER_OPTION[CUSTOM_OPTION.STICKER][selectedStickerIdx].id}.png`}
                    style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                    }}
                />
            )}

            <button
                className="bg-n-white/[.2] rounded-800 absolute right-[24px] top-[24px] w-[42px] h-[42px]"
                onClick={handleShuffleBot}
            >
                <img
                    alt="캐스퍼 일렉트릭 봇 랜덤화"
                    className="p-300"
                    src="/assets/bot-custom/shuffle.svg"
                />
            </button>
        </div>
    );
}

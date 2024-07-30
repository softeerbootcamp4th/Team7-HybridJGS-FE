import { cva } from "class-variance-authority";
import Category from "@/components/Category";
import {
    CASPER_OPTION,
    CUSTOM_OPTION,
    OPTION_TYPE,
    POSITION_OPTION,
} from "@/constants/BotCustom/casper";
import useBotCustomContext from "@/hooks/useBotCustomContext";
import BotCustomPanelLayout from "./BotCustomPanelLayout";

const selectableImageVariants = cva(`rounded-1000 border-[2px]`, {
    variants: {
        selected: {
            true: "border-s-red",
            false: "border-transparent",
        },
    },
});

export default function EyesPanel() {
    const { selectedBotIdx, handleSelectOption } = useBotCustomContext();

    const selectedEyes = CASPER_OPTION[CUSTOM_OPTION.EYES][selectedBotIdx[CUSTOM_OPTION.EYES]];
    const selectedEyesDirection =
        CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION][selectedBotIdx[CUSTOM_OPTION.EYES_DIRECTION]];

    const eyes = CASPER_OPTION[CUSTOM_OPTION.EYES];
    const limitedEyes = eyes.filter((eye) => eye.type === OPTION_TYPE.LIMITED);
    const basicEyes = eyes.filter((eye) => eye.type === OPTION_TYPE.BASIC);
    const directionEyes = [POSITION_OPTION.CENTER, POSITION_OPTION.LEFT, POSITION_OPTION.RIGHT];

    const handleClickEyes = (id: string) => {
        handleSelectOption(CUSTOM_OPTION.EYES, id);
    };

    const handleClickEyesDirection = (id: string) => {
        handleSelectOption(CUSTOM_OPTION.EYES_DIRECTION, id);
    };

    return (
        <BotCustomPanelLayout className="px-[30px] py-1000">
            <div className="flex flex-col gap-700">
                <Category type="limited">CASPER Electric Limited</Category>
                <div className="flex gap-700">
                    {limitedEyes.map((eye) => (
                        <button
                            key={eye.id}
                            className={selectableImageVariants({
                                selected: selectedEyes.id === eye.id,
                            })}
                            onClick={() => handleClickEyes(eye.id)}
                        >
                            <img
                                src={`/assets/bot-custom/eyes/${eye.id}-center.png`}
                                style={{ width: "148px", height: "48px" }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-[38px]" />

            <div className="flex flex-col gap-700">
                <Category type="basic">Basic</Category>
                <div className="flex gap-700">
                    {basicEyes.map((eye) => (
                        <button
                            key={eye.id}
                            className={selectableImageVariants({
                                selected: selectedEyes.id === eye.id,
                            })}
                            onClick={() => handleClickEyes(eye.id)}
                        >
                            <img
                                src={`/assets/bot-custom/eyes/${eye.id}-center.png`}
                                style={{ width: "148px", height: "48px" }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t-[2px] border-n-neutral-500 mt-1000" />

            <div className="flex flex-col gap-700 mt-[30px]">
                <p className="h-body-1-regular text-n-white">눈은 어느 쪽을 볼까요?</p>
                <div className="flex gap-700">
                    {directionEyes.map((direction) => (
                        <button
                            key={direction}
                            className={selectableImageVariants({
                                selected: selectedEyesDirection.id === direction,
                            })}
                            onClick={() => handleClickEyesDirection(direction)}
                        >
                            <img
                                src={`/assets/bot-custom/eyes/${eyes[0].id}-${direction}.png`}
                                style={{ width: "148px", height: "48px" }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </BotCustomPanelLayout>
    );
}

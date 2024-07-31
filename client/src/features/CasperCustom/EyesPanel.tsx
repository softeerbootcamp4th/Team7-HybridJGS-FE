import { cva } from "class-variance-authority";
import Category from "@/components/Category";
import {
    CASPER_OPTION,
    CUSTOM_OPTION,
    OPTION_TYPE,
    POSITION_OPTION,
} from "@/constants/CasperCustom/casper";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCustomPanelLayout from "./CasperCustomPanelLayout";

const selectableImageVariants = cva(`rounded-1000 border-[2px] cursor-pointer`, {
    variants: {
        selected: {
            true: "border-s-red",
            false: "border-transparent",
        },
    },
});

export default function EyesPanel() {
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();

    const eyesOptions = CASPER_OPTION[CUSTOM_OPTION.EYES];
    const eyesDirectionOptions = CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION];

    const selectedEyes = eyesOptions[selectedCasperIdx[CUSTOM_OPTION.EYES]];
    const selectedEyesDirection =
        eyesDirectionOptions[selectedCasperIdx[CUSTOM_OPTION.EYES_DIRECTION]];

    const limitedEyes = eyesOptions.filter((eye) => eye.type === OPTION_TYPE.LIMITED);
    const basicEyes = eyesOptions.filter((eye) => eye.type === OPTION_TYPE.BASIC);
    const eyesDirectionArray = [
        POSITION_OPTION.CENTER,
        POSITION_OPTION.LEFT,
        POSITION_OPTION.RIGHT,
    ];

    const handleClickEyes = (id: string) => {
        handleSelectOption(CUSTOM_OPTION.EYES, id);
    };

    const handleClickEyesDirection = (id: string) => {
        handleSelectOption(CUSTOM_OPTION.EYES_DIRECTION, id);
    };

    return (
        <CasperCustomPanelLayout className="px-[30px] py-1000">
            <div className="flex flex-col gap-700">
                <Category type="limited">CASPER Electric Limited</Category>
                <ul className="flex gap-700">
                    {limitedEyes.map((eye) => (
                        <li
                            key={eye.id}
                            className={selectableImageVariants({
                                selected: selectedEyes.id === eye.id,
                            })}
                            onClick={() => handleClickEyes(eye.id)}
                        >
                            <img
                                src={`/assets/casper-custom/preview/${eye.id}-center.png`}
                                style={{ width: "148px", height: "48px" }}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-[38px]" />

            <div className="flex flex-col gap-700">
                <Category type="basic">Basic</Category>
                <ul className="flex gap-700">
                    {basicEyes.map((eye) => (
                        <li
                            key={eye.id}
                            className={selectableImageVariants({
                                selected: selectedEyes.id === eye.id,
                            })}
                            onClick={() => handleClickEyes(eye.id)}
                        >
                            <img
                                src={`/assets/casper-custom/preview/${eye.id}-center.png`}
                                style={{ width: "148px", height: "48px" }}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t-[2px] border-n-neutral-500 mt-1000" />

            <div className="flex flex-col gap-700 mt-[30px]">
                <p className="h-body-1-regular text-n-white">눈은 어느 쪽을 볼까요?</p>
                <ul className="flex gap-700">
                    {eyesDirectionArray.map((direction) => (
                        <li
                            key={direction}
                            className={selectableImageVariants({
                                selected: selectedEyesDirection.id === direction,
                            })}
                            onClick={() => handleClickEyesDirection(direction)}
                        >
                            {eyesOptions.length !== 0 ? (
                                <img
                                    src={`/assets/casper-custom/preview/${eyesOptions[0].id}-${direction}.png`}
                                    style={{ width: "148px", height: "48px" }}
                                />
                            ) : (
                                <></>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </CasperCustomPanelLayout>
    );
}

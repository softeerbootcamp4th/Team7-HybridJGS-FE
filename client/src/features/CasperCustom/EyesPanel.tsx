import Category from "@/components/Category";
import {
    CASPER_OPTION,
    CUSTOM_OPTION,
    OPTION_TYPE,
    POSITION_OPTION,
} from "@/constants/CasperCustom/casper";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import { CasperCustomPanelLayout } from "./CasperCustomPanelLayout";
import { EyesOptionImageItem } from "./EyesOptionImageItem";

export function EyesPanel() {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

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
        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.EYES, id },
        });
    };

    const handleClickEyesDirection = (id: string) => {
        dispatch({
            type: CASPER_ACTION.SELECT_OPTION,
            payload: { option: CUSTOM_OPTION.EYES_DIRECTION, id },
        });
    };

    return (
        <CasperCustomPanelLayout className="px-[30px] py-1000">
            <div className="flex flex-col gap-700">
                <Category type="limited">CASPER Electric Limited</Category>
                <ul className="flex gap-700">
                    {limitedEyes.map((eye) => (
                        <EyesOptionImageItem
                            key={eye.id}
                            isSelected={selectedEyes.id === eye.id}
                            handleClickOption={() => handleClickEyes(eye.id)}
                            previewUrl={`${eye.id}-center.png`}
                        />
                    ))}
                </ul>
            </div>

            <div className="mt-[38px]" />

            <div className="flex flex-col gap-700">
                <Category type="basic">Basic</Category>
                <ul className="flex gap-700">
                    {basicEyes.map((eye) => (
                        <EyesOptionImageItem
                            key={eye.id}
                            isSelected={selectedEyes.id === eye.id}
                            handleClickOption={() => handleClickEyes(eye.id)}
                            previewUrl={`${eye.id}-center.png`}
                        />
                    ))}
                </ul>
            </div>

            <div className="border-t-[2px] border-n-neutral-500 mt-1000" />

            <div className="flex flex-col gap-700 mt-[30px]">
                <p className="h-body-1-regular text-n-white">눈은 어느 쪽을 볼까요?</p>
                <ul className="flex gap-700">
                    {eyesOptions.length !== 0 &&
                        eyesDirectionArray.map((direction) => (
                            <EyesOptionImageItem
                                key={direction}
                                isSelected={selectedEyesDirection.id === direction}
                                handleClickOption={() => handleClickEyesDirection(direction)}
                                previewUrl={`${eyesOptions[0].id}-${direction}.png`}
                            />
                        ))}
                </ul>
            </div>
        </CasperCustomPanelLayout>
    );
}

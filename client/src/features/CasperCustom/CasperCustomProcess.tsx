import { useState } from "react";
import CTAButton from "@/components/CTAButton";
import ListStep from "@/components/ListStep";
import { CUSTOM_OPTION_ARRAY } from "@/constants/CasperCustom/customStep";
import CasperCardFront from "@/features/CasperCustom/CasperCardFront";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";

export default function CasperCustomProcess() {
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();
    const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(0);

    const PanelComponent = CUSTOM_OPTION_ARRAY[selectedOptionIdx].component;

    const customOptionLabels = CUSTOM_OPTION_ARRAY.map((option) => option.label);
    const isFirstOption = selectedOptionIdx === 0;
    const isLastOption = selectedOptionIdx === CUSTOM_OPTION_ARRAY.length - 1;

    const handleClickPrevButton = () => {
        if (!isFirstOption) {
            setSelectedOptionIdx(selectedOptionIdx - 1);
        }
    };

    const handleClickNextButton = () => {
        if (!isLastOption) {
            setSelectedOptionIdx(selectedOptionIdx + 1);
        } else {
            // TODO: 완료 로직
        }
    };

    return (
        <>
            <div className="flex items-end gap-1000">
                <CasperCardFront optionDescription="정면을 보는 15인치 알로이 휠 눈" />

                <div className="flex flex-col gap-400 mt-[42px]">
                    <ListStep
                        options={customOptionLabels}
                        selectedIdx={selectedOptionIdx}
                        handleClickOption={(idx) => setSelectedOptionIdx(idx)}
                    />
                    {PanelComponent}
                </div>
            </div>

            <div className="flex gap-500 mt-1000">
                {!isFirstOption && (
                    <CTAButton label="이전으로" color="white" onClick={handleClickPrevButton} />
                )}
                <CTAButton
                    label={isLastOption ? "최종 완료" : "다음으로"}
                    onClick={handleClickNextButton}
                />
            </div>
        </>
    );
}

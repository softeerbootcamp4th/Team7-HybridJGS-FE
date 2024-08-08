import { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import ListStep from "@/components/ListStep";
import { CUSTOM_OPTION_ARRAY } from "@/constants/CasperCustom/customStep";
import { DISSOLVE } from "@/constants/animation";
import { MyCasperCardFront } from "@/features/CasperCustom/MyCasperCardFront";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { getCasperOptionDescription } from "@/utils/CasperCustom/getCasperOptionDescription";
import { SCROLL_MOTION } from "../../constants/animation";

interface CasperCustomProcessProps {
    handleClickNextStep: () => void;
}

export function CasperCustomProcess({ handleClickNextStep }: CasperCustomProcessProps) {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

    const optionDescription = getCasperOptionDescription({ selectedStepIdx, selectedCasperIdx });

    const PanelComponent = CUSTOM_OPTION_ARRAY[selectedStepIdx].component;

    const customOptionLabels = CUSTOM_OPTION_ARRAY.map((option) => option.label);
    const isFirstOption = selectedStepIdx === 0;
    const isLastOption = selectedStepIdx === CUSTOM_OPTION_ARRAY.length - 1;

    const handleClickPrevButton = () => {
        if (!isFirstOption) {
            setSelectedStepIdx(selectedStepIdx - 1);
        }
    };

    const handleClickNextButton = () => {
        if (!isLastOption) {
            setSelectedStepIdx(selectedStepIdx + 1);
        } else {
            handleClickNextStep();
        }
    };

    return (
        <motion.div className="flex flex-col items-center" {...SCROLL_MOTION(DISSOLVE)}>
            <div className="flex items-end gap-1000">
                <MyCasperCardFront optionDescription={optionDescription} />

                <div className="flex flex-col gap-400 mt-[42px]">
                    <ListStep
                        options={customOptionLabels}
                        selectedIdx={selectedStepIdx}
                        handleClickOption={(idx) => setSelectedStepIdx(idx)}
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
        </motion.div>
    );
}

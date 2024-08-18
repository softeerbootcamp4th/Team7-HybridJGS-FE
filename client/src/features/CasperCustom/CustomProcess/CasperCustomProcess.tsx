import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import ListStep from "@/components/ListStep";
import { CUSTOM_OPTION_ARRAY } from "@/constants/CasperCustom/customStep";
import { DISSOLVE } from "@/constants/animation";
import { SCROLL_MOTION } from "@/constants/animation";
import { MyCasperCardFront } from "@/features/CasperCustom/CasperCard/MyCasperCardFront";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { getCasperOptionDescription } from "@/utils/CasperCustom/getCasperOptionDescription";

interface CasperCustomProcessProps {
    handleClickNextStep: () => void;
}

const CUSTOM_OPTION_LABELS = CUSTOM_OPTION_ARRAY.map((option) => option.label);

export function CasperCustomProcess({ handleClickNextStep }: CasperCustomProcessProps) {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

    const optionDescription = getCasperOptionDescription({ selectedStepIdx, selectedCasperIdx });

    const PanelComponent = CUSTOM_OPTION_ARRAY[selectedStepIdx].component;

    const isFirstOption = selectedStepIdx === 0;
    const isLastOption = selectedStepIdx === CUSTOM_OPTION_ARRAY.length - 1;

    const handleClickPrevButton = useCallback(() => {
        if (!isFirstOption) {
            setSelectedStepIdx(selectedStepIdx - 1);
        }
    }, [selectedStepIdx]);

    const handleClickNextButton = useCallback(() => {
        if (!isLastOption) {
            setSelectedStepIdx(selectedStepIdx + 1);
        } else {
            handleClickNextStep();
        }
    }, [selectedStepIdx, isLastOption]);

    const handleClickOption = useCallback((idx: number) => {
        setSelectedStepIdx(idx);
    }, []);

    return (
        <motion.div className="flex flex-col items-center" {...SCROLL_MOTION(DISSOLVE)}>
            <div className="flex items-end gap-1000">
                <MyCasperCardFront optionDescription={optionDescription} />

                <div className="flex flex-col gap-400 mt-[42px]">
                    <ListStep
                        options={CUSTOM_OPTION_LABELS}
                        selectedIdx={selectedStepIdx}
                        handleClickOption={handleClickOption}
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

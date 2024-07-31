import { useState } from "react";
import {
    CUSTOM_STEP_HEADLINE,
    CUSTOM_STEP_OPTION,
    CUSTOM_STEP_OPTION_ARRAY,
} from "@/constants/CasperCustom/customStep";
import { CasperCustomProvider } from "@/contexts/casperCustomContext";
import CasperCustomFinish from "@/features/CasperCustom/CasperCustomFinish";
import CasperCustomFinishing from "@/features/CasperCustom/CasperCustomFinishing";
import CasperCustomForm from "@/features/CasperCustom/CasperCustomForm";
import CasperCustomProcess from "@/features/CasperCustom/CasperCustomProcess";

export default function CasperCustom() {
    const [selectedStepIdx, setSelectedStepIdx] = useState(0);

    const selectedStep = CUSTOM_STEP_OPTION_ARRAY[selectedStepIdx];

    const handleClickNextStep = () => {
        setSelectedStepIdx(selectedStepIdx + 1);
    };

    const handleSubmitCustomCasper = () => {
        // TODO: 제출 로직 구현

        handleClickNextStep();
    };

    const renderCustomStep = () => {
        if (selectedStep === CUSTOM_STEP_OPTION.PROCESS) {
            return <CasperCustomProcess handleClickNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FORM) {
            return <CasperCustomForm handleSubmitCustomCasper={handleSubmitCustomCasper} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISHING) {
            return <CasperCustomFinishing navigateNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISH) {
            return <CasperCustomFinish />;
        }
        return <></>;
    };

    return (
        <CasperCustomProvider>
            <div className="bg-n-black w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
                {CUSTOM_STEP_HEADLINE[selectedStep] && (
                    <div className="flex flex-col items-center gap-300">
                        <h3 className="text-n-white h-heading-3-bold">
                            {CUSTOM_STEP_HEADLINE[selectedStep].title}
                        </h3>
                        <h3 className="text-n-neutral-500 h-heading-4-regular text-center">
                            {CUSTOM_STEP_HEADLINE[selectedStep].description}
                        </h3>
                    </div>
                )}
                {renderCustomStep()}
            </div>
        </CasperCustomProvider>
    );
}

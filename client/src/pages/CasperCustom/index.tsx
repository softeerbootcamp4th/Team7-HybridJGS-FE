import { useState } from "react";
import { motion } from "framer-motion";
import NavigationConfirmPopUp from "@/components/NavigationConfirmPopUp";
import {
    CUSTOM_STEP_HEADLINE,
    CUSTOM_STEP_OPTION,
    CUSTOM_STEP_OPTION_ARRAY,
} from "@/constants/CasperCustom/customStep";
import { CASPER_CUSTOM_SECTIONS } from "@/constants/PageSections/sections";
import { DISSOLVE } from "@/constants/animation";
import { SCROLL_MOTION } from "@/constants/animation";
import { CasperCustomProvider } from "@/contexts/casperCustomContext";
import {
    CasperCustomFinish,
    CasperCustomFinishing,
    CasperCustomForm,
    CasperCustomProcess,
} from "@/features/CasperCustom";
import { useBlockNavigation } from "@/hooks/useBlockNavigation";
import useHeaderStyleObserver from "@/hooks/useHeaderStyleObserver";

const INITIAL_STEP = 0;

export default function CasperCustom() {
    const { unblockNavigation, isBlockedNavigation, proceedNavigation, cancelNavigation } =
        useBlockNavigation();

    const containerRef = useHeaderStyleObserver({
        darkSections: [CASPER_CUSTOM_SECTIONS.CUSTOM],
    });

    const [selectedStepIdx, setSelectedStepIdx] = useState(INITIAL_STEP);
    const selectedStep = CUSTOM_STEP_OPTION_ARRAY[selectedStepIdx];

    const handleClickNextStep = () => {
        setSelectedStepIdx((prevSelectedIdx) => prevSelectedIdx + 1);
    };

    const handleResetStep = () => {
        setSelectedStepIdx(INITIAL_STEP);
    };

    const renderCustomStep = () => {
        if (selectedStep === CUSTOM_STEP_OPTION.PROCESS) {
            return <CasperCustomProcess handleClickNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FORM) {
            return <CasperCustomForm navigateNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISHING) {
            return <CasperCustomFinishing navigateNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISH) {
            return (
                <CasperCustomFinish
                    handleResetStep={handleResetStep}
                    unblockNavigation={unblockNavigation}
                />
            );
        }
        return <></>;
    };

    return (
        <CasperCustomProvider>
            <div ref={containerRef}>
                <section
                    id={CASPER_CUSTOM_SECTIONS.CUSTOM}
                    className="bg-n-black w-screen h-screen overflow-hidden flex flex-col justify-center items-center"
                >
                    {CUSTOM_STEP_HEADLINE[selectedStep] && (
                        <motion.div
                            key={CUSTOM_STEP_HEADLINE[selectedStep]?.title}
                            className="flex flex-col items-center gap-300"
                            {...SCROLL_MOTION(DISSOLVE)}
                        >
                            <h3 className="text-n-white h-heading-3-bold">
                                {CUSTOM_STEP_HEADLINE[selectedStep]?.title}
                            </h3>
                            <h3 className="text-n-neutral-500 h-heading-4-regular text-center">
                                {CUSTOM_STEP_HEADLINE[selectedStep]?.description}
                            </h3>
                        </motion.div>
                    )}
                    {renderCustomStep()}
                </section>
            </div>

            {isBlockedNavigation && (
                <NavigationConfirmPopUp
                    handleConfirm={proceedNavigation}
                    handleClose={cancelNavigation}
                />
            )}
        </CasperCustomProvider>
    );
}

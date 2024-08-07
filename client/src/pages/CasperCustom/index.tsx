import { useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { LotteryAPI } from "@/apis/lotteryAPI";
import { COOKIE_TOKEN_KEY } from "@/constants/Auth/token";
import {
    CUSTOM_STEP_HEADLINE,
    CUSTOM_STEP_OPTION,
    CUSTOM_STEP_OPTION_ARRAY,
} from "@/constants/CasperCustom/customStep";
import { DISSOLVE } from "@/constants/animation";
import { CasperCustomProvider } from "@/contexts/casperCustomContext";
import {
    CasperCustomFinish,
    CasperCustomFinishing,
    CasperCustomForm,
    CasperCustomProcess,
} from "@/features/CasperCustom";
import { CasperInformationType } from "@/types/lotteryApi";

const INITIAL_STEP = 0;

export default function CasperCustom() {
    const [cookies] = useCookies([COOKIE_TOKEN_KEY]);

    const [selectedStepIdx, setSelectedStepIdx] = useState(INITIAL_STEP);
    const selectedStep = CUSTOM_STEP_OPTION_ARRAY[selectedStepIdx];

    const handleClickNextStep = () => {
        setSelectedStepIdx(selectedStepIdx + 1);
    };

    const handleSubmitCustomCasper = async (casper: CasperInformationType) => {
        await LotteryAPI.postCasper(cookies.token, casper);
        handleClickNextStep();
    };

    const handleResetStep = () => {
        setSelectedStepIdx(INITIAL_STEP);
    };

    const renderCustomStep = () => {
        if (selectedStep === CUSTOM_STEP_OPTION.PROCESS) {
            return <CasperCustomProcess handleClickNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FORM) {
            return <CasperCustomForm handleSubmitCustomCasper={handleSubmitCustomCasper} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISHING) {
            return <CasperCustomFinishing navigateNextStep={handleClickNextStep} />;
        } else if (selectedStep === CUSTOM_STEP_OPTION.FINISH) {
            return <CasperCustomFinish handleResetStep={handleResetStep} />;
        }
        return <></>;
    };

    return (
        <CasperCustomProvider>
            <div className="bg-n-black w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
                {CUSTOM_STEP_HEADLINE[selectedStep] && (
                    <motion.div
                        key={CUSTOM_STEP_HEADLINE[selectedStep]?.title}
                        className="flex flex-col items-center gap-300"
                        {...DISSOLVE}
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
            </div>
        </CasperCustomProvider>
    );
}

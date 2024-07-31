import { useState } from "react";
import { CUSTOM_STEP_HEADLINE, CUSTOM_STEP_OPTION } from "@/constants/CasperCustom/customStep";
import { CasperCustomProvider } from "@/contexts/casperCustomContext";
import CasperCustomProcess from "@/features/CasperCustom/CasperCustomProcess";

export default function CasperCustom() {
    const [selectedStep, setSelectedStep] = useState(CUSTOM_STEP_OPTION.PROCESS);

    return (
        <CasperCustomProvider>
            <div className="bg-n-black w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="flex flex-col items-center gap-300">
                    <h3 className="text-n-white h-heading-3-bold">
                        {CUSTOM_STEP_HEADLINE[selectedStep].title}
                    </h3>
                    <h3 className="text-n-neutral-500 h-heading-4-regular">
                        {CUSTOM_STEP_HEADLINE[selectedStep].description}
                    </h3>
                </div>
                {selectedStep === CUSTOM_STEP_OPTION.PROCESS ? <CasperCustomProcess /> : <></>}
            </div>
        </CasperCustomProvider>
    );
}

import { CASPER_OPTION, CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { CUSTOM_OPTION_ARRAY } from "@/constants/CasperCustom/customStep";
import { SelectedCasperIdxType } from "@/types/casperCustom";

interface GetCasperOptionDescriptionProps {
    selectedStepIdx: number;
    selectedCasperIdx: SelectedCasperIdxType;
}

export function getCasperOptionDescription({
    selectedStepIdx,
    selectedCasperIdx,
}: GetCasperOptionDescriptionProps) {
    const selectedStepId = CUSTOM_OPTION_ARRAY[selectedStepIdx].id;
    const selectedOptionIdx = selectedCasperIdx[selectedStepId];

    if (selectedOptionIdx === null) {
        return "";
    }

    if (selectedStepId !== CUSTOM_OPTION.EYES) {
        const selectedOption = CASPER_OPTION[selectedStepId];
        return selectedOption[selectedOptionIdx].description;
    }

    const eyesOption = CASPER_OPTION[CUSTOM_OPTION.EYES];
    const eyesDirectionOption = CASPER_OPTION[CUSTOM_OPTION.EYES_DIRECTION];
    const selectedEyesIdx = selectedCasperIdx[CUSTOM_OPTION.EYES];
    const selectedEyesDirectionIdx = selectedCasperIdx[CUSTOM_OPTION.EYES_DIRECTION];

    return `${eyesDirectionOption[selectedEyesDirectionIdx].description} ${eyesOption[selectedEyesIdx].description}`;
}

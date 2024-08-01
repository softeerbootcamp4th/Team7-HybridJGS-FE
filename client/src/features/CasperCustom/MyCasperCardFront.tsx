import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardFrontUI from "./CasperCardFrontUI";

interface MyCasperCardFrontProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    optionDescription?: string;
    casperName?: string;
    hasRandomButton?: boolean;
}

export default function MyCasperCardFront({
    size,
    optionDescription,
    casperName,
    hasRandomButton,
}: MyCasperCardFrontProps) {
    const { selectedCasperIdx, handleShuffleCasper } = useCasperCustomContext();

    return (
        <CasperCardFrontUI
            size={size}
            optionDescription={optionDescription}
            casperName={casperName}
            hasRandomButton={hasRandomButton}
            selectedCasperIdx={selectedCasperIdx}
            handleShuffleCasper={handleShuffleCasper}
        />
    );
}

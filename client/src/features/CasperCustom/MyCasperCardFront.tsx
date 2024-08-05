import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
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
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    return (
        <CasperCardFrontUI
            size={size}
            optionDescription={optionDescription}
            casperName={casperName}
            hasRandomButton={hasRandomButton}
            selectedCasperIdx={selectedCasperIdx}
            handleShuffleCasper={() => dispatch({ type: CASPER_ACTION.SHUFFLE_CASPER })}
        />
    );
}

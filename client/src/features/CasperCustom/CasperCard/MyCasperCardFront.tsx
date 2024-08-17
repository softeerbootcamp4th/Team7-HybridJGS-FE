import { memo, useCallback } from "react";
import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import useCasperCustomDispatchContext from "@/hooks/useCasperCustomDispatchContext";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CASPER_ACTION } from "@/types/casperCustom";
import { CasperCardFrontUI } from "./CasperCardFrontUI";

interface MyCasperCardFrontProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    optionDescription?: string;
    casperName?: string;
    hasRandomButton?: boolean;
}

function MyCasperCardFront({
    size,
    optionDescription,
    casperName,
    hasRandomButton,
}: MyCasperCardFrontProps) {
    const { selectedCasperIdx } = useCasperCustomStateContext();
    const dispatch = useCasperCustomDispatchContext();

    const handleDispatchShuffle = useCallback(() => {
        dispatch({ type: CASPER_ACTION.SHUFFLE_CASPER });
    }, []);

    return (
        <CasperCardFrontUI
            size={size}
            optionDescription={optionDescription}
            casperName={casperName}
            hasRandomButton={hasRandomButton}
            selectedCasperIdx={selectedCasperIdx}
            handleShuffleCasper={handleDispatchShuffle}
        />
    );
}

const MemoizedMyCasperCardFront = memo(MyCasperCardFront);
export { MemoizedMyCasperCardFront as MyCasperCardFront };

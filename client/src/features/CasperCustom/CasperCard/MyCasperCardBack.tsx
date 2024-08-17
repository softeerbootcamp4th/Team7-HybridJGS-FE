import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import { CasperCardBackUI } from "./CasperCardBackUI";

interface MyCasperCardBackProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    casperName: string;
    expectations?: string;
}

export function MyCasperCardBack({ size, casperName, expectations }: MyCasperCardBackProps) {
    const { selectedCasperIdx } = useCasperCustomStateContext();

    return (
        <CasperCardBackUI
            size={size}
            casperName={casperName}
            expectations={expectations}
            selectedCasperIdx={selectedCasperIdx}
        />
    );
}

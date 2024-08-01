import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardBackUI from "./CasperCardBackUI";

interface MyCasperCardBackProps {
    size?: (typeof CASPER_SIZE_OPTION)[keyof typeof CASPER_SIZE_OPTION];
    casperName: string;
    expectations?: string;
}

export default function MyCasperCardBack({
    size,
    casperName,
    expectations,
}: MyCasperCardBackProps) {
    const { selectedCasperIdx } = useCasperCustomContext();

    return (
        <CasperCardBackUI
            size={size}
            casperName={casperName}
            expectations={expectations}
            selectedCasperIdx={selectedCasperIdx}
        />
    );
}

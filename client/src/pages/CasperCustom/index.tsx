import { CasperCustomProvider } from "@/contexts/casperCustomContext";
import CasperCustomProcess from "@/features/CasperCustom/CasperCustomProcess";

export default function CasperCustom() {
    return (
        <CasperCustomProvider>
            <CasperCustomProcess />
        </CasperCustomProvider>
    );
}

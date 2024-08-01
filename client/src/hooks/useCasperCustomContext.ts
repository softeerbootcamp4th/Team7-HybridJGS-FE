import { useContext } from "react";
import { CasperCustomContext, CasperCustomContextType } from "../contexts/casperCustomContext";

export default function useCasperCustomContext(): CasperCustomContextType {
    const context = useContext(CasperCustomContext);
    if (context === null) {
        throw new Error("casperCustomContext must be used within a useCasperCustomProvider");
    }
    return context;
}

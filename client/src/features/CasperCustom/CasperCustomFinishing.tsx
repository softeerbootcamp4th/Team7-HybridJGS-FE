import { useEffect } from "react";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardBack from "./CasperCardBack";
import CasperCardFront from "./CasperCardFront";

interface CasperCustomFinishingProps {
    navigateNextStep: () => void;
}

export default function CasperCustomFinishing({ navigateNextStep }: CasperCustomFinishingProps) {
    const { casperName, expectations } = useCasperCustomContext();

    useEffect(() => {
        setTimeout(() => {
            navigateNextStep();
        }, 5000);
    }, []);

    return (
        <div className="flex">
            <CasperCardFront casperName={casperName} hasRandomButton={false} />
            <CasperCardBack casperName={casperName} expectations={expectations} />
        </div>
    );
}

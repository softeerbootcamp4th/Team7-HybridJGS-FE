import { useEffect } from "react";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import MyCasperCardBack from "./MyCasperCardBack";
import MyCasperCardFront from "./MyCasperCardFront";

interface CasperCustomFinishingProps {
    navigateNextStep: () => void;
}

export default function CasperCustomFinishing({ navigateNextStep }: CasperCustomFinishingProps) {
    const { casperName, expectations } = useCasperCustomContext();

    useEffect(() => {
        // TODO: flip 애니메이션 후 next step으로 넘어가게 하기
        setTimeout(() => {
            navigateNextStep();
        }, 3000);
    }, []);

    return (
        <div className="flex">
            <MyCasperCardFront casperName={casperName} hasRandomButton={false} />
            <MyCasperCardBack casperName={casperName} expectations={expectations} />
        </div>
    );
}

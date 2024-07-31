import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardBack from "./CasperCardBack";
import CasperCardFront from "./CasperCardFront";

interface CasperCustomFinishingProps {}

export default function CasperCustomFinishing({}: CasperCustomFinishingProps) {
    const { casperName, expectations } = useCasperCustomContext();

    return (
        <div className="flex">
            <CasperCardFront casperName={casperName} hasRandomButton={false} />
            <CasperCardBack casperName={casperName} expectations={expectations} />
        </div>
    );
}

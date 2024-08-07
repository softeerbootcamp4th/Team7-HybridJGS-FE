import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { DISSOLVE } from "@/constants/animation";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import useToast from "@/hooks/useToast";
import { CasperCardType } from "../CasperShowCase/TransitionCasperCards";
import { CasperFlipCard } from "./CasperFlipCard";

interface CasperCustomFinishingProps {
    navigateNextStep: () => void;
}

export function CasperCustomFinishing({ navigateNextStep }: CasperCustomFinishingProps) {
    const { casperName, expectations, selectedCasperIdx } = useCasperCustomStateContext();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const { showToast, ToastComponent } = useToast("추첨 이벤트에 응모가 완료되었어요!");

    const card: Omit<CasperCardType, "id"> = {
        casperName,
        expectations,
        selectedCasperIdx,
    };

    useEffect(() => {
        showToast();

        setTimeout(() => {
            setIsFlipped(true);
        }, 3000);

        setTimeout(() => {
            navigateNextStep();
        }, 6000);
    }, []);

    return (
        <>
            <motion.div className="flex" {...DISSOLVE}>
                <CasperFlipCard size={CASPER_SIZE_OPTION.LG} card={card} isFlipped={isFlipped} />
            </motion.div>

            {ToastComponent}
        </>
    );
}

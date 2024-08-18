import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CASPER_SIZE_OPTION } from "@/constants/CasperCustom/casper";
import { DISSOLVE } from "@/constants/animation";
import { SCROLL_MOTION } from "@/constants/animation";
import { CasperFlipCard } from "@/features/CasperCustom/CasperCard/CasperFlipCard";
import { CasperCardType } from "@/features/CasperShowCase/TransitionCasperCards";
import useCasperCustomStateContext from "@/hooks/useCasperCustomStateContext";
import useToast from "@/hooks/useToast";

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

        const flipTimer = setTimeout(() => {
            setIsFlipped(true);
        }, 2000);

        const navigateTimer = setTimeout(() => {
            navigateNextStep();
        }, 4000);

        return () => {
            clearTimeout(flipTimer);
            clearTimeout(navigateTimer);
        };
    }, []);

    return (
        <>
            <motion.div className="flex" {...SCROLL_MOTION(DISSOLVE)}>
                <CasperFlipCard size={CASPER_SIZE_OPTION.LG} card={card} isFlipped={isFlipped} />
            </motion.div>

            {ToastComponent}
        </>
    );
}

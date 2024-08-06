import { ReactNode } from "react";
import { motion } from "framer-motion";
import Tooltip from "@/components/Tooltip";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface ElectricSectionProps {
    id: SectionKey;
    tooltipContent: string;
    tooltipChildren: ReactNode;
    children: ReactNode;
    descriptionClass?: string;
    descriptionChildren: ReactNode;
}

export function ElectricSection({
    id,
    tooltipContent,
    tooltipChildren,
    children,
    descriptionClass,
    descriptionChildren,
}: ElectricSectionProps) {
    return (
        <section
            id={id}
            className="h-screen bg-n-white flex flex-col justify-center items-center pt-32 snap-start"
        >
            <motion.div {...SCROLL_MOTION(ASCEND)}>
                <Tooltip content={tooltipContent} tooltipPosition="right">
                    {tooltipChildren}
                </Tooltip>
            </motion.div>
            <motion.span
                className={`h-body-1-regular text-n-neutral-950 mt-2 mb-8 ${descriptionClass}`}
                {...SCROLL_MOTION(ASCEND)}
            >
                {descriptionChildren}
            </motion.span>
            <motion.div
                className="flex flex-col justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                {children}
            </motion.div>
        </section>
    );
}

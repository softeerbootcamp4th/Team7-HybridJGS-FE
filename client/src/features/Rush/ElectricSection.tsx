import { ReactNode } from "react";
import { motion } from "framer-motion";
import Tooltip from "@/components/Tooltip";
import { ASCEND } from "@/constants/animation.ts";

interface ElectricSectionProps {
    tooltipContent: string;
    tooltipChildren: ReactNode;
    children: ReactNode;
    descriptionClass?: string;
    descriptionChildren: ReactNode;
}

export function ElectricSection({
    tooltipContent,
    tooltipChildren,
    children,
    descriptionClass,
    descriptionChildren,
}: ElectricSectionProps) {
    return (
        <section className="h-screen bg-n-white flex justify-center items-center pt-32 snap-start">
            <motion.div className="flex flex-col justify-center items-center" {...ASCEND}>
                <Tooltip content={tooltipContent} tooltipPosition="right">
                    {tooltipChildren}
                </Tooltip>
                <span
                    className={`h-body-1-regular text-n-neutral-950 mt-2 mb-8 ${descriptionClass}`}
                    {...ASCEND}
                >
                    {descriptionChildren}
                </span>
                {children}
            </motion.div>
        </section>
    );
}

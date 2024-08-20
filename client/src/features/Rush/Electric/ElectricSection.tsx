import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";
import Tooltip from "@/components/Tooltip";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKeyProps } from "@/types/sections.ts";

interface ElectricSectionProps extends SectionKeyProps {
    tooltipContent: string;
    tooltipChildren: ReactNode;
    children: ReactNode;
    descriptionClass?: string;
    descriptionChildren: ReactNode;
}

const ElectricSection = forwardRef<HTMLDivElement, ElectricSectionProps>(function ElectricSection(
    { id, tooltipContent, tooltipChildren, children, descriptionClass, descriptionChildren },
    ref
) {
    return (
        <section
            id={id}
            ref={ref}
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
});

export { ElectricSection };

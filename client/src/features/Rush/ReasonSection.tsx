import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface ReasonSectionProps {
    id: SectionKey;
    subtitle: string;
    children: ReactNode;
}

export default function ReasonSection({ id, subtitle, children }: ReasonSectionProps) {
    return (
        <section
            id={id}
            className="h-[316px] bg-n-neutral-50 flex justify-center items-center gap-3 snap-start"
        >
            <motion.div
                className="flex flex-col justify-center items-center gap-3"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-1-regular text-n-neutral-500">{subtitle}</p>
                <span className="h-heading-2-bold text-n-neutral-950 flex flex-col justify-center items-center">
                    {children}
                </span>
            </motion.div>
        </section>
    );
}

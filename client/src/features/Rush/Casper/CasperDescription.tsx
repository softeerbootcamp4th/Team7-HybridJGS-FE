import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { CasperSubDescription } from "@/features/Rush/Casper/CasperSubDescription.tsx";

interface CasperDescriptionProps {
    title: ReactNode;
    subTitle: ReactNode;
    description?: string[] | ReactNode;
}

export function CasperDescription({ title, subTitle, description }: CasperDescriptionProps) {
    return (
        <div className="flex gap-[42px]">
            <motion.h2 className="h-heading-2-bold text-s-blue" {...SCROLL_MOTION(ASCEND)}>
                {title}
            </motion.h2>
            <CasperSubDescription subTitle={subTitle} description={description} />
        </div>
    );
}

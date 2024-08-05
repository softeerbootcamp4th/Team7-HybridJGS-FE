import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ASCEND } from "@/constants/animation.ts";
import CasperSubDescription from "@/features/Rush/CasperSubDescription.tsx";

interface CasperDescriptionProps {
    title: ReactNode;
    subTitle: ReactNode;
    description?: string[] | ReactNode;
}

export default function CasperDescription({
    title,
    subTitle,
    description,
}: CasperDescriptionProps) {
    return (
        <div className="flex gap-[42px]">
            <motion.h2 className="h-heading-2-bold text-s-blue" {...ASCEND}>
                {title}
            </motion.h2>
            <CasperSubDescription subTitle={subTitle} description={description} />
        </div>
    );
}

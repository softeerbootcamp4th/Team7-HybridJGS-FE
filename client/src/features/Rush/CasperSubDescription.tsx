import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";

interface CasperDescriptionProps {
    subTitle: ReactNode;
    description?: string[] | ReactNode;
}

export default function CasperSubDescription({ subTitle, description }: CasperDescriptionProps) {
    return (
        <motion.div className="flex flex-col gap-400 text-n-neutral-950" {...SCROLL_MOTION(ASCEND)}>
            <h2 className="h-heading-2-bold">{subTitle}</h2>
            <span className="flex flex-col h-body-1-regular">
                {Array.isArray(description)
                    ? description.map((line, idx) => <p key={idx}>{line}</p>)
                    : description}
            </span>
        </motion.div>
    );
}

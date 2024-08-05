import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ASCEND } from "@/constants/animation.ts";

interface DescriptionProps {
    direction?: "vertical" | "horizontal";
    label: ReactNode;
    title: ReactNode;
    description: ReactNode;
}

const titleContainerVariants = cva(`flex`, {
    variants: {
        direction: {
            vertical: "flex-col items-center gap-400 text-center",
            horizontal: "gap-[42px]",
        },
    },
});

export default function Description({
    direction = "horizontal",
    label,
    title,
    description,
}: DescriptionProps) {
    return (
        <motion.div className={titleContainerVariants({ direction })} {...ASCEND}>
            <h2 className="h-heading-2-bold text-s-blue">{label}</h2>
            <div className="flex flex-col gap-400">
                <h2 className="h-heading-2-bold text-n-neutral-950">{title}</h2>
                <p className="h-body-1-regular">{description}</p>
            </div>
        </motion.div>
    );
}

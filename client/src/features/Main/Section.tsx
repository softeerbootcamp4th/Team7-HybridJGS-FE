import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKeyProps } from "@/types/sections.ts";

interface SectionProps extends PropsWithChildren, SectionKeyProps {
    backgroundColor: string;
    title: string;
    titleColor: string;
    subtitle: string;
    description: string;
    descriptionColor: string;
    url?: string;
}

export default function Section({
    id,
    backgroundColor,
    title,
    titleColor,
    subtitle,
    description,
    descriptionColor,
    children,
    url,
}: SectionProps) {
    return (
        <section
            id={id}
            className={`flex flex-col gap-3 justify-center items-center h-screen snap-start ${backgroundColor}`}
        >
            <motion.div
                className="flex flex-col gap-3 justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className={`h-body-1-regular ${titleColor}`}>{title}</p>
                <p className={`h-heading-2-bold ${titleColor}`}>{subtitle}</p>
                <p className={`h-body-1-medium ${descriptionColor}`}>{description}</p>
            </motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND)}>{children}</motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND)}>
                <CTAButton label="이벤트 참여하기" hasArrowIcon={true} url={url} />
            </motion.div>
        </section>
    );
}

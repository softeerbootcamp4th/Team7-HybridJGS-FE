import { PropsWithChildren, forwardRef } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND } from "@/constants/animation.ts";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface SectionProps extends PropsWithChildren {
    sectionId: SectionKey;
    backgroundColor: string;
    title: string;
    titleColor: string;
    subtitle: string;
    description: string;
    descriptionColor: string;
    url?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    (
        {
            sectionId,
            backgroundColor,
            title,
            titleColor,
            subtitle,
            description,
            descriptionColor,
            children,
            url,
        },
        ref
    ) => {
        return (
            <section
                ref={ref}
                id={sectionId}
                className={`flex flex-col gap-3 justify-center items-center h-screen snap-start ${backgroundColor}`}
            >
                <motion.div className="flex flex-col gap-3 justify-center items-center" {...ASCEND}>
                    <p className={`h-body-1-regular ${titleColor}`}>{title}</p>
                    <p className={`h-heading-2-bold ${titleColor}`}>{subtitle}</p>
                    <p className={`h-body-1-medium ${descriptionColor}`}>{description}</p>
                </motion.div>
                {children}
                <CTAButton label="이벤트 참여하기" hasArrowIcon={true} url={url} />
            </section>
        );
    }
);

export default Section;

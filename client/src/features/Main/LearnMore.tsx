import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface LearnMoreProps {
    id: SectionKey;
}

export default function LearnMore({ id }: LearnMoreProps) {
    return (
        <section
            id={id}
            className="flex flex-col gap-6 justify-center items-center h-[76.5vh] bg-[url('/assets/main/car-2.jpg')] bg-no-repeat bg-cover snap-start"
        >
            <motion.div
                className="flex flex-col gap-3 justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-heading-3-bold text-n-white">나의 첫 전기차</p>
                <p className="h-heading-1-bold text-n-white">CASPER Electric</p>
                <CTAButton
                    label="더 알아보러 가기"
                    hasShareIcon={true}
                    url="https://casper.hyundai.com/vehicles/electric/highlight"
                />
            </motion.div>
        </section>
    );
}

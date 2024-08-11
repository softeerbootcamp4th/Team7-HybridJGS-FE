import { motion } from "framer-motion";
import RushCardComparison from "@/components/RushCardComparison";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";

export default function CardOptions() {
    return (
        <motion.div
            className="flex flex-col gap-8 justify-center items-center"
            {...SCROLL_MOTION(ASCEND)}
        >
            <p className="h-heading-2-bold pt-10">2개의 후보 중 하나를 선택해주세요</p>
            <RushCardComparison />
        </motion.div>
    );
}

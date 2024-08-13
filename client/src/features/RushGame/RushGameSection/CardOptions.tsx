import { motion } from "framer-motion";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import RushCardComparison from "@/features/RushGame/RushGameCard/RushCardComparison.tsx";
import RushCountdown from "@/features/RushGame/RushGameCard/RushCountdown.tsx";
import useToggleContents from "@/hooks/useToggleContents.ts";

export default function CardOptions() {
    const { toggleContents } = useToggleContents(true, 5000);

    return (
        <motion.div
            className="flex flex-col gap-3 justify-center items-center pt-6"
            {...SCROLL_MOTION(ASCEND)}
        >
            {toggleContents ? (
                <motion.p
                    className="h-heading-2-bold h-[150px] flex items-end pb-8"
                    {...SCROLL_MOTION(ASCEND)}
                >
                    2개의 후보 중 하나를 선택해주세요
                </motion.p>
            ) : (
                <motion.div {...SCROLL_MOTION(DISSOLVE)}>
                    <RushCountdown />
                </motion.div>
            )}
            <RushCardComparison />
        </motion.div>
    );
}

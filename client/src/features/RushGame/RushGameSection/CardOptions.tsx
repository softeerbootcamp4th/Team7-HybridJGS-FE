import { motion } from "framer-motion";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import RushCardComparison from "@/features/RushGame/RushGameCard/RushCardComparison.tsx";
import RushCountDown from "@/features/RushGame/RushGameCard/RushCountDown.tsx";
import useCountDown from "@/hooks/useCountDown.ts";
import useTimer from "@/hooks/useTimer.ts";

export default function CardOptions() {
    const countdown = useCountDown(50);
    const { toggleContents } = useTimer();

    return (
        <motion.div
            className="flex flex-col gap-3 justify-center items-center pt-14"
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
                    <RushCountDown countdown={countdown} />
                </motion.div>
            )}
            <RushCardComparison />
        </motion.div>
    );
}

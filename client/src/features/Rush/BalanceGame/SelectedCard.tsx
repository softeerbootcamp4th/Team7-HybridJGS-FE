import { motion } from "framer-motion";
import RushCardResultDescription from "@/components/RushCardResultDescription";
import RushCountDown from "@/components/RushCountDown";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useCountDown from "@/hooks/useCountDown.ts";

export default function SelectedCard() {
    const countdown = useCountDown(5);

    return (
        <motion.div
            className="flex flex-col gap-3 justify-center items-center pt-14"
            {...SCROLL_MOTION(ASCEND)}
        >
            <RushCountDown countdown={countdown} />
            <RushCardResultDescription color="red" day={1} cardType="LEFT_OPTIONS" />
        </motion.div>
    );
}

import { motion } from "framer-motion";
import RushCardResultDescription from "@/components/RushCardResultDescription";
import RushCountDown from "@/components/RushCountDown";
import { CARD_COLOR, CARD_DAYS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
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
            <RushCardResultDescription
                color={CARD_COLOR.RED}
                day={CARD_DAYS.DAY1}
                cardType={CARD_TYPE.LEFT_OPTIONS}
            />
        </motion.div>
    );
}

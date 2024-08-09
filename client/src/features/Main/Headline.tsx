import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LotteryAPI } from "@/apis/lotteryAPI.ts";
import Keyword from "@/components/Keyword";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKeyProps } from "@/types/sections.ts";
import { formatEventDateRangeWithDot } from "@/utils/formatDate.ts";

export function Headline({ id }: SectionKeyProps) {
    const [startDateTime, setStartDateTime] = useState<string | null>(null);
    const [endDateTime, setEndDateTime] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const data = await LotteryAPI.getLottery();
            setStartDateTime(data.eventStartDate);
            setEndDateTime(data.eventEndDate);
        })();
    }, []);
    return (
        <section
            id={id}
            className="h-screen bg-[url('/assets/main/car-1.jpg')] bg-no-repeat bg-cover flex flex-col justify-center items-center snap-start"
        >
            <motion.div
                className="flex flex-col justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <Keyword children="CASPER Electric 출시 기념 이벤트" />
                <img
                    src="/assets/main/title.webp"
                    alt="main-title"
                    className="w-[667px] h-[300px] mt-10"
                />
                <p className="h-heading-3-medium text-n-white pb-28">
                    {startDateTime && endDateTime
                        ? formatEventDateRangeWithDot(startDateTime, endDateTime)
                        : ""}
                </p>
            </motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="light">
                    <p>이벤트에 대해 궁금하다면 </p>
                    <p className="h-body-2-bold">스크롤</p>
                    <p>해 보세요</p>
                </Scroll>
            </motion.div>
        </section>
    );
}

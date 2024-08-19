import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { RushAPI } from "@/apis/rushAPI.ts";
import { TotalAPI } from "@/apis/totalAPI.ts";
import Keyword from "@/components/Keyword";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useFetch from "@/hooks/useFetch.ts";
import { RushEventStatusCodeResponse } from "@/types/rushApi.ts";
import { SectionKeyProps } from "@/types/sections.ts";
import { GetTotalEventDateResponse } from "@/types/totalApi.ts";
import { formatEventDateRangeWithDot } from "@/utils/formatDate.ts";

interface HeadlineProps extends SectionKeyProps {
    handleClickScroll: () => void;
}

function Headline({ id, handleClickScroll }: HeadlineProps) {
    // DATA RESET TEST API
    const { fetchData: getRushTodayEventTest } = useFetch<RushEventStatusCodeResponse>(() =>
        RushAPI.getRushTodayEventTest()
    );

    const {
        data: totalData,
        isSuccess: isSuccessTotalData,
        fetchData: getTotal,
    } = useFetch<GetTotalEventDateResponse>(() => TotalAPI.getTotal());

    useEffect(() => {
        getRushTodayEventTest();
        getTotal();
    }, []);

    const { totalEventStartDate, totalEventEndDate }: GetTotalEventDateResponse =
        totalData || ({} as GetTotalEventDateResponse);

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
                    {isSuccessTotalData &&
                        totalEventStartDate &&
                        totalEventEndDate &&
                        formatEventDateRangeWithDot(totalEventStartDate, totalEventEndDate)}
                </p>
            </motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="light" onClick={handleClickScroll}>
                    <p>이벤트에 대해 궁금하다면 </p>
                    <p className="h-body-2-bold">스크롤</p>
                    <p>해 보세요</p>
                </Scroll>
            </motion.div>
        </section>
    );
}

const MemoizedHeadline = memo(Headline);
export { MemoizedHeadline as Headline };

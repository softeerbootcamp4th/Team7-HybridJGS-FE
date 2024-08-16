import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { RushAPI } from "@/apis/rushAPI.ts";
import { TotalAPI } from "@/apis/totalAPI.ts";
import Keyword from "@/components/Keyword";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { COOKIE_KEY } from "@/constants/cookie.ts";
import useFetch from "@/hooks/useFetch.ts";
import { RushEventStatusCodeResponse } from "@/types/rushApi.ts";
import { SectionKeyProps } from "@/types/sections.ts";
import { GetTotalEventDateResponse } from "@/types/totalApi.ts";
import { formatEventDateRangeWithDot } from "@/utils/formatDate.ts";

function Headline({ id }: SectionKeyProps) {
    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [endDateTime, setEndDateTime] = useState<string>("");

    // DATA RESET TEST API
    const { fetchData: getRushTodayEventTest } = useFetch<RushEventStatusCodeResponse, string>(
        (token) => RushAPI.getRushTodayEventTest(token)
    );

    const {
        data: totalData,
        isSuccess: isSuccessTotalData,
        fetchData: getTotal,
    } = useFetch<GetTotalEventDateResponse>(() => TotalAPI.getTotal());

    useEffect(() => {
        getRushTodayEventTest(cookies[COOKIE_KEY.ACCESS_TOKEN]);
        getTotal();
    }, []);

    useEffect(() => {
        if (isSuccessTotalData && totalData) {
            setStartDateTime(totalData.totalEventStartDate);
            setEndDateTime(totalData.totalEventEndDate);
        }
    }, [isSuccessTotalData, totalData]);

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
                    {startDateTime &&
                        endDateTime &&
                        formatEventDateRangeWithDot(startDateTime, endDateTime)}
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

const MemoizedHeadline = memo(Headline);
export { MemoizedHeadline as Headline };

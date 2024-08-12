import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RushAPI } from "@/apis/rushAPI.ts";
import { Background } from "@/components/Background";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useAuth from "@/hooks/useAuth.ts";
import { SectionKeyProps } from "@/types/sections.ts";

export function Headline({ id }: SectionKeyProps) {
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [endDateTime, setEndDateTime] = useState<string>("");

    useEffect(() => {
        (async () => {
            const rushData = await RushAPI.getRush();
            setStartDateTime(rushData.eventStartDate);
            setEndDateTime(rushData.eventEndDate);
        })();
    }, []);

    const { handleClickShortCut, PopupComponent, ToastComponent } = useAuth({
        eventStartDate: startDateTime,
        eventEndDate: endDateTime,
        confirmUrl: "/rush/game",
    });

    return (
        <section
            id={id}
            className="h-screen flex flex-col gap-14 justify-center items-center snap-start"
        >
            <Background>
                <motion.div
                    className="flex flex-col items-center gap-400"
                    {...SCROLL_MOTION(ASCEND)}
                >
                    <p className="h-body-1-regular text-n-black">Event 2. 선착순 이벤트</p>
                    <h2 className="h-heading-2-bold text-n-black text-center">
                        캐스퍼 일렉트릭 선착순 밸런스 게임
                        <br />
                        참여하고 선물 받아가세요!
                    </h2>
                </motion.div>

                <motion.div className="mt-[49px]" {...SCROLL_MOTION(ASCEND)}>
                    <CTAButton
                        label="선착순 밸런스 게임 하러 가기"
                        hasArrowIcon
                        onClick={handleClickShortCut}
                    />
                </motion.div>
            </Background>

            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="dark">
                    <p className="h-body-2-bold">스크롤</p>
                    <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
                </Scroll>
            </motion.div>

            {PopupComponent}
            {ToastComponent}
        </section>
    );
}

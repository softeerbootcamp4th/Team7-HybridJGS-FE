import { useCallback } from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import usePopup from "@/hooks/usePopup.tsx";
import useToast from "@/hooks/useToast.tsx";
import { GetTotalRushEventsResponse } from "@/types/rushApi.ts";
import { SectionKeyProps } from "@/types/sections.ts";
import { getMsTime } from "@/utils/getMsTime.ts";

interface HeadlineProps extends SectionKeyProps {
    handleClickScroll: () => void;
}

export function Headline({ id, handleClickScroll }: HeadlineProps) {
    const rushData = useLoaderData() as GetTotalRushEventsResponse;

    const { phoneNumberState, handlePhoneNumberChange, handlePhoneNumberConfirm } =
        useAuth("/rush/game");

    const { handleOpenPopup, PopupComponent } = usePopup({
        phoneNumber: phoneNumberState,
        handlePhoneNumberChange,
        handlePhoneNumberConfirm,
    });

    const { showToast, ToastComponent } = useToast("이벤트 기간이 아닙니다");

    const handleClickShortCut = useCallback(() => {
        const startDate = getMsTime(rushData.eventStartDate);
        const endDate = getMsTime(rushData.eventEndDate);
        const currentDate = getMsTime(rushData.serverTime);

        const isEventPeriod = currentDate >= startDate && currentDate <= endDate;

        if (isEventPeriod) {
            handleOpenPopup();
        } else {
            showToast();
        }
    }, [rushData]);

    return (
        <section
            id={id}
            className="h-screen bg-[url('/assets/rush/two-car.jpg')] bg-no-repeat bg-cover flex flex-col gap-14 justify-center items-center snap-start"
        >
            <motion.div className="flex flex-col items-center gap-400" {...SCROLL_MOTION(ASCEND)}>
                <p className="h-body-1-regular text-n-black">Event 2. 선착순 이벤트</p>
                <h2 className="h-heading-2-bold text-n-black text-center">
                    캐스퍼 일렉트릭 선착순 밸런스 게임
                    <br />
                    참여하고 선물 받아가세요!
                </h2>
            </motion.div>

            <motion.div className="mt-[20px]" {...SCROLL_MOTION(ASCEND)}>
                <CTAButton
                    label="선착순 밸런스 게임 하러 가기"
                    hasArrowIcon
                    onClick={handleClickShortCut}
                />
            </motion.div>

            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="dark" onClick={handleClickScroll}>
                    <p className="h-body-2-bold">스크롤</p>
                    <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
                </Scroll>
            </motion.div>

            {PopupComponent}
            {ToastComponent}
        </section>
    );
}

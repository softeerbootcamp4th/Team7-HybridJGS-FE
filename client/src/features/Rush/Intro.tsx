import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface IntroProps {
    id: SectionKey;
}

export default function Intro({ id }: IntroProps) {
    return (
        <section
            id={id}
            className="flex flex-col justify-center items-center gap-3 h-screen bg-[url('/assets/rush/car.jpg')] bg-no-repeat bg-cover snap-start"
        >
            <motion.p className="h-body-1-regular text-n-white" {...SCROLL_MOTION(ASCEND)}>
                나의 첫 전기차 CASPER Electric
            </motion.p>
            <motion.span
                className="h-heading-2-bold text-n-white flex flex-col justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p>전기차가 처음이라면</p>
                <p>CASPER Electric으로 시작해요</p>
            </motion.span>
            <motion.span
                className="h-body-1-regular text-n-white flex flex-col justify-center items-center"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p>캐스퍼 일렉트릭은 이번에 현대자동차에서 새롭게 출시한 도심형 전기차예요.</p>
                <p>SUV 캐스퍼의 전기차 모델로, 2024년 7월 9일부터 사전예약을 받기 시작해</p>
                <p>아직 실제 길에서는 볼 수 없는 따끈따끈한 신모델이랍니다.</p>
            </motion.span>
        </section>
    );
}

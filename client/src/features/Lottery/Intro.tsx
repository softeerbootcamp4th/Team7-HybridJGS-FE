import { motion } from "framer-motion";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";

export default function Intro() {
    return (
        <section className="h-screen relative flex flex-col snap-start">
            <motion.div
                className="mt-[112px] flex flex-col items-center gap-400 text-n-neutral-950"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-1-regular">CASPER Electric Design</p>
                <h2 className="h-heading-2-bold text-center">
                    캐스퍼 일렉트릭의 다부지고 트렌디한
                    <br />
                    디자인은 차급을 넘어서요
                </h2>
                <p className="h-body-1-regular">
                    캐스퍼 일렉트릭은 기존 캐스퍼의 단단한 실루엣을 계승하면서도 고유한 디자인
                    요소로 트렌디함을 더했어요.
                </p>
            </motion.div>

            <motion.div className="absolute bottom-0" {...SCROLL_MOTION(DISSOLVE)}>
                <img
                    alt="인트로 차 이미지"
                    src="/assets/lottery/car-intro.jpg"
                    className="h-[674px] object-cover w-screen"
                />
            </motion.div>
        </section>
    );
}

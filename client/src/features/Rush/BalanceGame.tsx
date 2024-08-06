import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";
import { ASCEND, ASCEND_DESCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import Background from "@/features/Rush/Background.tsx";

export default function BalanceGame() {
    return (
        <section className="relative h-screen bg-n-white flex flex-col gap-8 justify-center items-center snap-start">
            <motion.p className="h-heading-2-bold pt-10" {...SCROLL_MOTION(ASCEND)}>
                이제 곧 하단에 밸런스 게임 주제가 공개돼요!
            </motion.p>
            <Background>
                <div className="flex flex-col gap-6 justify-center items-center w-[800px] h-[390px] bg-n-white rounded-[29px] relative z-20">
                    <p className="h-body-1-regular text-n-neutral-500">
                        밸런스 게임 주제 공개까지 남은 시간
                    </p>
                    <div className="flex items-end gap-6 font-['HyundaiSansTextOffice-Bold'] font-normal text-[100px] text-n-neutral-950">
                        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
                            <p className="h-body-2-regular text-n-neutral-500">Hours</p>
                            <p className="leading-[100px]">04</p>
                        </span>
                        <p className="leading-[100px]">:</p>
                        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
                            <p className="h-body-2-regular text-n-neutral-500">Minutes</p>
                            <p className="leading-[100px]">21</p>
                        </span>
                        <p className="leading-[100px]">:</p>
                        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
                            <p className="h-body-2-regular text-n-neutral-500">Seconds</p>
                            <p className="leading-[100px]">32</p>
                        </span>
                    </div>
                </div>
            </Background>
            <motion.div
                className="flex flex-col justify-center items-center gap-4 my-3"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-2-regular text-n-neutral-500">
                    우리 편에 투표할 친구를 불러오세요!
                </p>
                <CTAButton label="이벤트 링크 공유" />
            </motion.div>
            <motion.div {...SCROLL_MOTION(ASCEND_DESCEND)}>
                <Scroll type="dark">
                    <p className="h-body-2-bold">스크롤</p>
                    <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
                </Scroll>
            </motion.div>
        </section>
    );
}

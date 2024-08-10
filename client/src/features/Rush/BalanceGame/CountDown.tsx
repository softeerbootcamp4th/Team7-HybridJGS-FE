import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { Background } from "@/features/Rush/Background.tsx";

interface CountDownProps {
    countdown: number;
}

export default function CountDown({ countdown }: CountDownProps) {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    const formatTime = (time: number) => time.toString().padStart(2, "0");

    return (
        <>
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
                            <p className="leading-[100px]">{formatTime(hours)}</p>
                        </span>
                        <p className="leading-[100px]">:</p>
                        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
                            <p className="h-body-2-regular text-n-neutral-500">Minutes</p>
                            <p className="leading-[100px]">{formatTime(minutes)}</p>
                        </span>
                        <p className="leading-[100px]">:</p>
                        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
                            <p className="h-body-2-regular text-n-neutral-500">Seconds</p>
                            <p className="leading-[100px]">{formatTime(seconds)}</p>
                        </span>
                    </div>
                </div>
            </Background>
        </>
    );
}

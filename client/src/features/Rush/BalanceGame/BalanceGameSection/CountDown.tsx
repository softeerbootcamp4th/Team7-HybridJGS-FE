import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import { Background } from "@/features/Rush/BalanceGame/Background.tsx";

interface CountDownProps {
    countdown: number;
}

function CountDownTimer({ countdown }: CountDownProps) {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    const formatTime = (time: number) => time.toString().padStart(2, "0");

    return (
        <div className="flex flex-col gap-6 justify-center items-center w-[800px] h-[390px] bg-n-white rounded-[29px] relative z-20">
            <p className="h-body-1-regular text-n-neutral-500">
                밸런스 게임 주제 공개까지 남은 시간
            </p>
            <div className="flex items-end gap-6 font-['HyundaiSansTextOffice-Bold'] font-normal text-[100px] text-n-neutral-950">
                <TimeDisplay label="Hours" value={formatTime(hours)} />
                <p className="leading-[100px]">:</p>
                <TimeDisplay label="Minutes" value={formatTime(minutes)} />
                <p className="leading-[100px]">:</p>
                <TimeDisplay label="Minutes" value={formatTime(seconds)} />
            </div>
        </div>
    );
}

function TimeDisplay({ label, value }: { label: string; value: string }) {
    return (
        <span className="flex flex-col justify-center items-center gap-4 w-[116px]">
            <p className="h-body-2-regular text-n-neutral-500">{label}</p>
            <p className="leading-[100px]">{value}</p>
        </span>
    );
}

export default function CountDown({ countdown }: CountDownProps) {
    return (
        <>
            <motion.p className="h-heading-2-bold pt-10" {...SCROLL_MOTION(ASCEND)}>
                이제 곧 하단에 밸런스 게임 주제가 공개돼요!
            </motion.p>
            <Background>
                <CountDownTimer countdown={countdown} />
            </Background>
        </>
    );
}

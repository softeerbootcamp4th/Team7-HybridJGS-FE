import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";

export function Background({ children }: PropsWithChildren) {
    return (
        <motion.div className="relative z-10" {...SCROLL_MOTION(ASCEND)}>
            <div className="absolute top-0 left-[-38px] w-[880px] h-[390px] rounded-[29px] overflow-hidden bg-n-white/[.16] -rotate-[4deg] z-20">
                <div className="w-1/2 h-full float-left bg-gradient-green blur-[40px]" />
                <div className="w-1/2 h-full float-right bg-gradient-red blur-[40px]" />
            </div>
            <div className="absolute top-0 left-[35px] w-[800px] h-[390px] rounded-[29px] overflow-hidden bg-n-white/[.16] z-5">
                <div className="w-1/2 h-full float-right bg-gradient-red blur-[40px]" />
            </div>
            <div className="absolute top-0 right-[35px] w-[800px] h-[390px] rounded-[29px] overflow-hidden bg-n-white/[.16] z-5">
                <div className="w-1/2 h-full float-left bg-gradient-green blur-[40px]" />
            </div>
            {children}
        </motion.div>
    );
}

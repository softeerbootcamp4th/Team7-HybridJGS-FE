import { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren) {
    return (
        <div className="relative z-10">
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
        </div>
    );
}

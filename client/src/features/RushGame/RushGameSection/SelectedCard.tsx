import { useEffect } from "react";
import { motion } from "framer-motion";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import RushCardCurrentRatio from "@/features/RushGame/RushGameCard/RushCardCurrentRatio.tsx";
import RushCardResultDescription from "@/features/RushGame/RushGameCard/RushCardResultDescription.tsx";
import RushCountdown from "@/features/RushGame/RushGameCard/RushCountdown.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import useToggleContents from "@/hooks/useToggleContents.ts";
import ArrowLeftIcon from "/public/assets/icons/arrow-line-left.svg?react";
import ArrowRightIcon from "/public/assets/icons/arrow-line-right.svg?react";

interface SelectedCardProps {
    onClick: () => void;
}

function SelectedCardDescription({ onClick }: SelectedCardProps) {
    return (
        <motion.div className="relative flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
            <RushCardResultDescription />
            <div className="absolute flex items-center justify-center top-1/2 right-[-150px]">
                <button
                    className="flex flex-col gap-1 justify-center items-center text-center cursor-pointer"
                    onClick={onClick}
                >
                    <p className="text-n-neutral-950 text-nowrap hover:underline">
                        전체 결과 보러가기
                    </p>
                    <ArrowRightIcon stroke="#22252A" />
                </button>
            </div>
        </motion.div>
    );
}

function SelectedCardCurrentRatio({ onClick }: SelectedCardProps) {
    return (
        <motion.div className="relative flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
            <RushCardCurrentRatio />
            <div className="absolute flex items-center justify-center top-1/2 left-[-170px]">
                <button
                    className="flex flex-col gap-1 justify-center items-center text-center cursor-pointer"
                    onClick={onClick}
                >
                    <p className="text-n-neutral-950 text-nowrap hover:underline">
                        이전 화면으로 돌아가기
                    </p>
                    <ArrowLeftIcon stroke="#22252A" />
                </button>
            </div>
        </motion.div>
    );
}

export default function SelectedCard() {
    const { toggleContents, toggle } = useToggleContents();
    const { fetchRushBalance } = useRushGameContext();

    useEffect(() => {
        fetchRushBalance();
    }, []);

    return (
        <motion.div
            className="flex flex-col gap-3 justify-center items-center pt-6"
            {...SCROLL_MOTION(ASCEND)}
        >
            <RushCountdown />
            {toggleContents ? (
                <SelectedCardDescription onClick={toggle} />
            ) : (
                <SelectedCardCurrentRatio onClick={toggle} />
            )}
        </motion.div>
    );
}

import { useState } from "react";
import { motion } from "framer-motion";
import RushCardCurrentRatio from "@/components/RushCardCurrentRatio";
import RushCardResultDescription from "@/components/RushCardResultDescription";
import RushCountDown from "@/components/RushCountDown";
import { CARD_COLOR, CARD_DAYS, CARD_TYPE } from "@/constants/Rush/rushCard.ts";
import { ASCEND, DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import useCountDown from "@/hooks/useCountDown.ts";
import ArrowLeftIcon from "/public/assets/icons/arrow-line-left.svg?react";
import ArrowRightIcon from "/public/assets/icons/arrow-line-right.svg?react";

interface SelectedCardProps {
    onClick: () => void;
}

function SelectedCardDescription({ onClick }: SelectedCardProps) {
    return (
        <motion.div className="relative flex gap-10" {...SCROLL_MOTION(DISSOLVE)}>
            <RushCardResultDescription
                color={CARD_COLOR.RED}
                day={CARD_DAYS.DAY4}
                cardType={CARD_TYPE.LEFT_OPTIONS}
            />
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
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
    const countdown = useCountDown(5);

    const handleChangeCardResult = () => {
        setIsDescriptionVisible((prev) => !prev);
    };

    return (
        <motion.div
            className="flex flex-col gap-3 justify-center items-center pt-14"
            {...SCROLL_MOTION(ASCEND)}
        >
            <RushCountDown countdown={countdown} />
            {isDescriptionVisible ? (
                <SelectedCardDescription onClick={handleChangeCardResult} />
            ) : (
                <SelectedCardCurrentRatio onClick={handleChangeCardResult} />
            )}
        </motion.div>
    );
}

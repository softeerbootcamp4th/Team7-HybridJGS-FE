import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import CardOptions from "@/features/RushGame/RushGameSection/CardOptions.tsx";
import Countdown from "@/features/RushGame/RushGameSection/Countdown.tsx";
import FinalResult from "@/features/RushGame/RushGameSection/FinalResult.tsx";
import SelectedCard from "@/features/RushGame/RushGameSection/SelectedCard.tsx";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";

// TODO: 계속 카운트 다운에 맞춰 매초 렌더링 되는 문제 해결
export default function RushGame() {
    const { gameState } = useRushGameContext();

    const renderRushGameContent = () => {
        console.log(gameState.phase);
        switch (gameState.phase) {
            case "NOT_STARTED":
                return <Countdown />;
            case "IN_PROGRESS":
                if (!gameState.userParticipatedStatus) {
                    return <CardOptions />;
                } else {
                    return <SelectedCard />;
                }
            case "COMPLETED":
                return <FinalResult />;
            default:
                return null;
        }
    };

    return (
        <section className="h-screen bg-n-white flex flex-col gap-8 justify-center items-center">
            {renderRushGameContent()}
            <motion.div
                className="flex flex-col justify-center items-center gap-4 my-3"
                {...SCROLL_MOTION(ASCEND)}
            >
                <p className="h-body-2-regular text-n-neutral-500">
                    우리 편에 투표할 친구를 불러오세요!
                </p>
                <CTAButton label="이벤트 링크 공유" />
            </motion.div>
        </section>
    );
}

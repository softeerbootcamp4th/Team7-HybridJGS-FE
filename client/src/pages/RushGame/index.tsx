import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { CARD_PHASE } from "@/constants/Rush/rushCard.ts";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import CardOptions from "@/features/RushGame/RushGameSections/CardOptions.tsx";
import Countdown from "@/features/RushGame/RushGameSections/Countdown.tsx";
import FinalResult from "@/features/RushGame/RushGameSections/FinalResult.tsx";
import SelectedCard from "@/features/RushGame/RushGameSections/SelectedCard.tsx";
import { useBlockNavigation } from "@/hooks/useBlockNavigation.ts";
import { useRushGameContext } from "@/hooks/useRushGameContext.ts";
import useToast from "@/hooks/useToast.tsx";
import { writeClipboard } from "@/utils/writeClipboard.ts";

export default function RushGame() {
    const { unblockNavigation } = useBlockNavigation(
        "이 페이지를 떠나면 모든 변경 사항이 저장되지 않습니다. 페이지를 떠나시겠습니까?"
    );

    const { gameState } = useRushGameContext();
    const { showToast, ToastComponent } = useToast("🔗 링크가 복사되었어요!");

    const handleClickShareButton = () => {
        writeClipboard(import.meta.env.VITE_RUSH_URL, showToast);
    };

    const renderRushGameContent = () => {
        switch (gameState.phase) {
            case CARD_PHASE.NOT_STARTED:
                return <Countdown />;
            case CARD_PHASE.IN_PROGRESS:
                if (!gameState.userParticipatedStatus) {
                    return <CardOptions />;
                } else {
                    return <SelectedCard unblockNavigation={unblockNavigation} />;
                }
            case CARD_PHASE.COMPLETED:
                return <FinalResult unblockNavigation={unblockNavigation} />;
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
                <CTAButton label="이벤트 링크 공유" onClick={handleClickShareButton} />
            </motion.div>

            {ToastComponent}
        </section>
    );
}

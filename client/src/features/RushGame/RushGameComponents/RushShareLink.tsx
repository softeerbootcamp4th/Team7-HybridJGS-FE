import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { ASCEND, SCROLL_MOTION } from "@/constants/animation.ts";
import useToast from "@/hooks/useToast.tsx";
import { writeClipboard } from "@/utils/writeClipboard.ts";

export default function RushShareLink() {
    const { showToast, ToastComponent } = useToast("🔗 링크가 복사되었어요!");

    const handleClickShareButton = () => {
        writeClipboard(import.meta.env.VITE_RUSH_URL, showToast);
    };

    return (
        <>
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
        </>
    );
}

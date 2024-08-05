import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import CTAButton from "@/components/CTAButton";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { ASCEND, DISSOLVE } from "@/constants/animation";
import CasperCards from "@/features/CasperShowCase/CasperCards";
import { GetCasperListResponse } from "@/types/lotteryApi";

function getCardListData(cardList: GetCasperListResponse) {
    return cardList.map((card) => {
        return {
            id: card.casperId,
            casperName: card.name,
            expectations: card.expectation,
            selectedCasperIdx: {
                [CUSTOM_OPTION.EYES]: card.eyeShape,
                [CUSTOM_OPTION.EYES_DIRECTION]: card.eyePosition,
                [CUSTOM_OPTION.MOUTH]: card.mouthShape,
                [CUSTOM_OPTION.COLOR]: card.color,
                [CUSTOM_OPTION.STICKER]: card.sticker,
            },
        };
    });
}

export default function CasperShowCase() {
    const data = useLoaderData() as GetCasperListResponse;
    const cardListData = getCardListData(data);

    const handleClickShare = () => {
        // TODO: 이벤트 링크 공유 로직
    };

    return (
        <div className="flex flex-col justify-center items-center gap-800 w-full h-screen bg-n-neutral-950 overflow-hidden pt-1000">
            <motion.div
                className="flex flex-col justify-center items-center gap-800 w-full"
                {...DISSOLVE}
            >
                <p className="h-body-1-regular text-n-white">
                    카드 위에 커서를 올리면 기대평을 볼 수 있어요
                </p>

                <CasperCards cardList={cardListData} />
            </motion.div>

            <motion.div className="flex gap-500" {...ASCEND}>
                <CTAButton label="이벤트 링크 공유" onClick={handleClickShare} />
                <CTAButton label="메인으로 돌아가기" url="/" color="white" />
            </motion.div>
        </div>
    );
}

import CTAButton from "@/components/CTAButton";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import CasperCards from "@/features/CasperShowCase/CasperCards";

// TODO: 나중에 후처리 부분도 API 폴더에 빼기
function getCardListData() {
    const cardList = new Array(100).fill(null).map((_, idx) => {
        return {
            casper_id: String(idx),
            eye_shape: "2",
            eye_position: "1",
            mouth_shape: "4",
            color: "2",
            sticker: "4",
            name: `name ${idx}`,
            expectation: "expectation",
            created_at: "2024/07/24",
        };
    });

    return cardList.map((card) => {
        return {
            id: card.casper_id,
            casperName: card.name,
            expectations: card.expectation,
            selectedCasperIdx: {
                [CUSTOM_OPTION.EYES]: parseInt(card.eye_shape) - 1,
                [CUSTOM_OPTION.EYES_DIRECTION]: parseInt(card.eye_position) - 1,
                [CUSTOM_OPTION.MOUTH]: parseInt(card.mouth_shape) - 1,
                [CUSTOM_OPTION.COLOR]: parseInt(card.color) - 1,
                [CUSTOM_OPTION.STICKER]: parseInt(card.sticker) - 1,
            },
        };
    });
}

export default function CasperShowCase() {
    const handleClickShare = () => {
        // TODO: 이벤트 링크 공유 로직
    };

    return (
        <div className="flex flex-col justify-center items-center gap-800 w-full h-screen bg-n-neutral-950 overflow-hidden pt-1000">
            <p className="h-body-1-regular text-n-white">
                카드 위에 커서를 올리면 기대평을 볼 수 있어요
            </p>

            <CasperCards cardList={getCardListData()} />

            <div className="flex gap-500">
                <CTAButton label="이벤트 링크 공유" onClick={handleClickShare} />
                <CTAButton label="메인으로 돌아가기" url="/" color="white" />
            </div>
        </div>
    );
}

import { cva } from "class-variance-authority";
import Category from "@/components/Category";
import {
    CARD_COLOR,
    CARD_DAYS,
    CARD_DESCRIPTION,
    CARD_SELECTED_STATUS,
    CARD_TITLES,
    CARD_TYPE,
} from "@/constants/Rush/rushCard.tsx";

interface RushCardDescriptionProps {
    color: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    day: (typeof CARD_DAYS)[keyof typeof CARD_DAYS];
    cardType: (typeof CARD_TYPE)[keyof typeof CARD_TYPE];
    cardStatus: (typeof CARD_SELECTED_STATUS)[keyof typeof CARD_SELECTED_STATUS];
}

const backgroundGradients = cva(
    `flex gap-[35px] w-[834px] h-[400px] bg-gradient-green rounded-800 py-6 px-[37px] justify-between`,
    {
        variants: {
            color: {
                [CARD_COLOR.BLUE]: "bg-gradient-blue",
                [CARD_COLOR.RED]: "bg-gradient-red",
                [CARD_COLOR.YELLOW]: "bg-gradient-yellow",
                [CARD_COLOR.GREEN]: "bg-gradient-green",
            },
        },
    }
);

export default function RushCardDescription({
    color,
    day,
    cardType,
    cardStatus,
}: RushCardDescriptionProps) {
    const title = CARD_TITLES[day][cardType];
    const [descriptionTitle, descriptionText] = CARD_DESCRIPTION[day][cardType][cardStatus];

    return (
        <div className={backgroundGradients({ color })}>
            <div className="flex flex-col gap-2 justify-center items-center w-[245px]">
                <Category type="limited">당신의 선택</Category>
                <h2 className="h-heading-2-bold text-center text-n-neutral-950">{title}</h2>
                <span className="h-body-1-regular text-center text-s-red">
                    <p>지금 </p>
                    <p className="h-body-1-bold">63%</p>
                    <p>가 선택했어요</p>
                </span>
            </div>
            <span className="flex flex-col justify-center items-center gap-3 w-[480px] h-[352px] rounded-800 bg-[url('/assets/main/car-2.jpg')] bg-no-repeat bg-center bg-cover text-n-white">
                <p className="text-center">CASPER Electric</p>
                <h2 className="h-heading-2-bold text-center">{descriptionTitle}</h2>
                <p className="h-body-1-bold text-center">{descriptionText}</p>
            </span>
        </div>
    );
}

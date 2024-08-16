import { forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import LotteryEvent from "@/components/LotteryEvent";
import { LOTTERY_EVENT_DATA } from "@/constants/Main/lotteryEventData.ts";
import { Section } from "@/features/Main/Section.tsx";
import { SectionKeyProps } from "@/types/sections.ts";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";

const Lottery = forwardRef<HTMLDivElement, SectionKeyProps>(function Lottery({ id }, ref) {
    return (
        <Section
            id={id}
            ref={ref}
            backgroundColor="bg-n-black"
            title="Event 1. 추첨 이벤트"
            titleColor="text-n-white"
            subtitle="나만의 캐스퍼 일렉트릭 봇 만들기"
            description="나만의 캐스퍼봇을 만들면 100% 응모 완료! 친구에게 공유하면 당첨 확률 UP!"
            descriptionColor="text-s-blue"
            url="/lottery"
        >
            <div className="flex gap-14 p-8 m-2 rounded-500 w-[1200px] h-[460px] bg-n-neutral-950">
                <img
                    src="/assets/common/casper.webp"
                    alt="casper"
                    className="w-[400px] h-[400px]"
                />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <p className="h-heading-4-bold text-n-white">이벤트 기간</p>
                        <p className="h-body-1-regular text-[#A6B2BA]">
                            2024. 08. 23. (금) ~ 2024. 09. 05 (목)
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="h-heading-4-bold text-n-white">참여 방법</p>
                        <p className="h-body-1-regular text-[#A6B2BA]">
                            나만의 스마일 로봇 뱃지를 꾸미면 이벤트 응모가 완료돼요.
                            <br />
                            CASPER Electric 기대평을 작성하고 친구에게 링크 공유하면 당첨 확률이
                            높아져요!
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="h-heading-4-bold text-n-white">이벤트 경품</p>
                        <div className="flex gap-10">
                            {LOTTERY_EVENT_DATA.map((event) => (
                                <LotteryEvent
                                    key={event.rank}
                                    rank={event.rank}
                                    image={event.image}
                                    prizeName={event.prizeName}
                                    winnerCount={event.winnerCount}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Link
                to="/lottery/show-case"
                className="flex w-[1200px] justify-end gap-1 h-body-1-regular text-n-neutral-500 hover:underline"
            >
                <p>다른 사람들의 스마일 로봇 뱃지 보러가기</p>
                <ArrowIcon stroke="#637381" />
            </Link>
        </Section>
    );
});

const MemoizedLottery = memo(Lottery);
export { MemoizedLottery as Lottery };

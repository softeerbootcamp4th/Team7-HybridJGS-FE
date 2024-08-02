import RushEvent, { RushEventProps } from "@/components/RushEvent";
import Section from "@/features/Main/Section.tsx";

// TODO: API로 대체될 데이터
export const rushEventData: RushEventProps[] = [
    {
        id: 1,
        date: "2024-07-28 09:00:00.000000",
        image: "/assets/main/rush/prize-1.png",
        prizeName: "영화 예매권",
    },
    {
        id: 2,
        date: "2024-07-29 09:00:00.000000",
        image: "/assets/main/rush/prize-2.png",
        prizeName: "야구 관람권",
    },
    {
        id: 3,
        date: "2024-07-30 09:00:00.000000",
        image: "/assets/main/rush/prize-3.jpg",
        prizeName: "올리브영 상품권",
    },
    {
        id: 4,
        date: "2024-07-31 09:00:00.000000",
        image: "/assets/main/rush/prize-4.jpeg",
        prizeName: "쿠팡 기프트카드",
    },
    {
        id: 5,
        date: "2024-08-01 09:00:00.000000",
        image: "/assets/main/rush/prize-5.jpg",
        prizeName: "배달의민족 기프트카드",
    },
    {
        id: 6,
        date: "2024-08-02 09:00:00.000000",
        image: "/assets/main/rush/prize-6.jpg",
        prizeName: "BBQ 기프트카드",
    },
];

export default function Rush() {
    return (
        <Section
            backgroundColor="bg-n-white"
            title="Event 2. 선착순 이벤트"
            titleColor="text-n-black"
            subtitle="매일 315명에게! 짜릿짜릿 선착순 밸런스 게임"
            description="매일 오후 10시! 선착순 밸런스 게임 참여하고 선물 받자!"
            descriptionColor="text-s-red"
            url="/rush"
        >
            <div className="flex flex-col gap-8 py-8 px-14 m-2 rounded-500 w-[1200px] h-[460px] bg-n-neutral-50">
                <div className="flex gap-[110px]">
                    <div className="flex flex-col gap-3">
                        <p className="h-heading-4-bold text-n-black">이벤트 기간</p>
                        <span className="flex flex-col">
                            <p className="h-body-1-regular text-n-neutral-500">
                                2024. 08. 25. (목) ~ 2024. 09. 01. (일)
                            </p>
                            <p className="h-body-1-regular text-s-red">매일 오후 10시!</p>
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="h-heading-4-bold text-n-black">참여 방법</p>
                        <p className="h-body-1-regular text-n-neutral-500">
                            오후 10시 부터 단 10분 간 공개되는 밸런스 게임. 둘 중 마음에 드는 쪽을
                            빠르게 선택해요!
                            <br />
                            10시 10분, 밸런스 게임이 종료되었을 때, 이긴 쪽을 선택한 선착순
                            315명에게 상품을 드려요.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="h-heading-4-bold text-n-black">이벤트 경품</p>
                    <div className="flex gap-6">
                        {rushEventData.map((event) => (
                            <RushEvent
                                key={event.id}
                                id={event.id}
                                date={event.date}
                                image={event.image}
                                prizeName={event.prizeName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

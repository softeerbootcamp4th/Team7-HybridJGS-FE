import CTAButton from "@/components/CTAButton";

export default function Rush() {
    return (
        <section className="flex flex-col gap-3 justify-center items-center h-screen bg-n-white">
            <p className="h-body-1-regular text-n-black">Event 2. 선착순 이벤트</p>
            <p className="h-heading-2-bold text-n-black">
                매일 315명에게! 짜릿짜릿 선착순 밸런스 게임
            </p>
            <p className="h-body-1-medium text-s-red">
                매일 오후 10시! 선착순 밸런스 게임 참여하고 선물 받자!
            </p>
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
                    <div className="flex gap-10">{/* 이벤트 경품 컴포넌트 추가 */}</div>
                </div>
            </div>
            <CTAButton label="이벤트 참여하기" hasArrowIcon={true} />
        </section>
    );
}

import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";

export default function BalanceGame() {
    return (
        <section className="h-screen bg-n-white flex flex-col gap-8 justify-center items-center">
            <p className="h-heading-2-bold pt-10">이제 곧 하단에 밸런스 게임 주제가 공개돼요!</p>
            <div className="flex flex-col gap-6 justify-center items-center w-[800px] h-[390px] bg-n-neutral-300 rounded-[29px]">
                <p className="h-body-1-regular text-n-neutral-500">
                    밸런스 게임 주제 공개까지 남은 시간
                </p>
                <div className="h-body-2-regular text-n-neutral-500 flex gap-[75px]">
                    <p>Hours</p>
                    <p>Minutes</p>
                    <p>Seconds</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 my-3">
                <p className="h-body-2-regular text-n-neutral-500">
                    우리 편에 투표할 친구를 불러오세요!
                </p>
                <CTAButton label="이벤트 링크 공유" />
            </div>
            <Scroll type="dark">
                <p className="h-body-2-bold">스크롤</p>
                <p>하고 캐스퍼 일렉트릭의 놀라운 성능을 알아보세요</p>
            </Scroll>
        </section>
    );
}

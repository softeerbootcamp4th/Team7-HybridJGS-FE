import { Link } from "react-router-dom";
import CTAButton from "@/components/CTAButton";
import Scroll from "@/components/Scroll";

export default function Lottery() {
    return (
        <div>
            <section className="h-screen bg-[url('/assets/lottery/electric-line.webp')] bg-no-repeat bg-cover w-full flex flex-col items-center justify-center">
                <div className="absolute">
                    <img
                        alt="캐스퍼 봇 아이콘"
                        src="/assets/lottery/casper-bot.webp"
                        className="max-w-[1475px]"
                    />
                </div>
                <div className="flex flex-col items-center gap-400">
                    <p className="h-body-1-regular text-n-white">Event 1. 추첨 이벤트</p>
                    <h2 className="h-heading-2-bold text-n-white text-center">
                        나만의 캐스퍼 일렉트릭 봇<br />
                        만들고 선물 받아가세요!
                    </h2>
                    <h3 className="h-heading-3-regular text-n-neutral-300">
                        기대평을 작성하면 당첨 확률이 높아져요!
                    </h3>
                </div>

                <Link to="/lottery/custom" className="mt-[49px]">
                    <CTAButton label="캐스퍼 일렉트릭 봇 만들러 가기" hasIcon onClick={() => {}} />
                </Link>

                <div className="mt-[146px]" />

                <Scroll type="light">
                    <p>캐스퍼 일렉트릭 봇이 어디서 왔는지 궁금하다면</p>
                    <p className="h-body-2-bold"> 스크롤</p>
                    <p>해보세요</p>
                </Scroll>
            </section>
        </div>
    );
}

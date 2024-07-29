import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import Keyword from "@/components/Keyword";
import Notice from "@/components/Notice";
import Scroll from "@/components/Scroll";
import ArrowIcon from "/public/assets/icons/arrow.svg?react";

export default function Main() {
    return (
        <div>
            <section className="h-screen bg-[url('/assets/main/car-1.jpg')] bg-no-repeat bg-cover flex flex-col justify-center items-center">
                <Keyword children="CASPER Electric 출시 기념 이벤트" />
                <div className="w-full h-[300px] mt-10 bg-[url('/assets/main/title.svg')] bg-no-repeat bg-center" />
                <p className="h-heading-3-medium text-n-white pb-28">
                    2024. 08. 21. (수) ~ 2024. 09. 03. (화)
                </p>
                <Scroll type="light">
                    <p>이벤트에 대해 궁금하다면 </p>
                    <p className="h-body-2-bold">스크롤</p>
                    <p>해 보세요</p>
                </Scroll>
            </section>
            <section className="flex flex-col gap-3 justify-center items-center h-screen bg-n-black">
                <p className="h-body-1-regular text-n-white">Event 1. 추첨 이벤트</p>
                <p className="h-heading-2-bold text-n-white">나만의 캐스퍼 일렉트릭 봇 만들기</p>
                <p className="h-body-1-medium text-s-blue">
                    나만의 캐스퍼봇을 만들면 100% 응모 완료! 친구에게 공유하면 당첨 확률 UP!
                </p>
                <div className="flex gap-14	p-8 m-2 rounded-500 w-[1200px] h-[460px] bg-n-neutral-950">
                    <img
                        src="/assets/main/casper.svg"
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
                            <div className="flex gap-10">{/* 이벤트 경품 컴포넌트 추가 */}</div>
                        </div>
                    </div>
                </div>
                <button className="flex w-[1200px] justify-end gap-1 h-body-1-regular text-n-neutral-500 hover:underline">
                    <p>다른 사람들의 스마일 로봇 뱃지 보러가기</p>
                    <ArrowIcon stroke="#637381" />
                </button>
                <CTAButton label="이벤트 참여하기" hasArrowIcon={true} />
            </section>
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
                                오후 10시 부터 단 10분 간 공개되는 밸런스 게임. 둘 중 마음에 드는
                                쪽을 빠르게 선택해요!
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
            <section className="flex flex-col gap-6 justify-center items-center h-[76.5vh] bg-[url('/assets/main/car-2.jpg')] bg-no-repeat bg-cover">
                <span className="flex flex-col gap-3 justify-center items-center">
                    <p className="h-heading-3-bold text-n-white">나의 첫 전기차</p>
                    <p className="h-heading-1-bold text-n-white">CASPER Electric</p>
                </span>
                <CTAButton
                    label="더 알아보러 가기"
                    hasShareIcon={true}
                    url="https://casper.hyundai.com/vehicles/electric/highlight"
                />
            </section>
            <Notice />
            <Footer />
        </div>
    );
}

import { Link } from "react-router-dom";
import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
import Scroll from "@/components/Scroll";
import Tooltip from "@/components/Tooltip";
import Description from "@/features/lottery/Description";
import Section from "@/features/lottery/Section";

export default function Lottery() {
    return (
        <div className="overflow-x-hidden">
            <section className="h-screen bg-[url('/assets/lottery/electric-line.webp')] bg-no-repeat bg-cover w-full relative flex flex-col items-center justify-center">
                <div className="absolute">
                    <img
                        alt="캐스퍼 봇 아이콘"
                        src="/assets/lottery/casper-badges.webp"
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

            <section className="h-screen relative flex flex-col">
                <div className="mt-[112px] flex flex-col items-center gap-400 text-n-neutral-950">
                    <p className="h-body-1-regular">CASPER Electric Design</p>
                    <h2 className="h-heading-2-bold text-center">
                        캐스퍼 일렉트릭의 다부지고 트렌디한
                        <br />
                        디자인은 차급을 넘어서요
                    </h2>
                    <p className="h-body-1-regular">
                        캐스퍼 일렉트릭은 기존 캐스퍼의 단단한 실루엣을 계승하면서도 고유한 디자인
                        요소로 트렌디함을 더했어요.
                    </p>
                </div>

                <div className="absolute bottom-0">
                    <img
                        alt="인트로 차 이미지"
                        src="/assets/lottery/car-intro.jpg"
                        className="h-[674px] object-cover"
                    />
                </div>
            </section>

            <Section>
                <div className="w-[1200px]">
                    <Description
                        label={
                            <>
                                새로운
                                <br />
                                원형 헤드램프
                            </>
                        }
                        title={<>나만의 캐스퍼 일렉트릭 봇 만들기</>}
                        description={
                            <>
                                캐스퍼 일렉트릭은 기존 캐스퍼에도 적용되었던
                                <br />
                                동그란 헤드램프를 4분할하여 미래적인 느낌을 전달해요.
                            </>
                        }
                    />

                    <div className="mt-[98px] flex gap-700">
                        <img
                            alt="헤드램프 첫번째 이미지"
                            src="/assets/lottery/head-lamp-1.jpg"
                            className="w-[666px] object-cover"
                        />
                        <Tooltip
                            content="충전 포트는 헤드라이트 옆에 있어요"
                            isVisible
                            tooltipPosition="right"
                        >
                            <img
                                alt="헤드램프 두번째 이미지"
                                src="/assets/lottery/head-lamp-2.jpg"
                                className="w-[510px] object-cover"
                            />
                        </Tooltip>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="w-[1200px]">
                    <Description
                        label={
                            <>
                                Pixel
                                <br />
                                Design
                            </>
                        }
                        title={<>픽셀 디자인은 현대 전기차만의 아이덴티티예요</>}
                        description={
                            <>
                                캐스퍼 일렉트릭은 방향 지시등이 단순한 빛이 아니라, 픽셀 형태의
                                독특한 패턴을 나타내요.
                                <br />
                                테일 램프와 운전대에도 이런 픽셀 디자인을 입혀 아이코닉함을 더한
                                디테일이 있답니다.
                            </>
                        }
                    />

                    <div className="mt-[98px] flex gap-700">
                        <img
                            alt="픽셀 디자인 첫번째 이미지"
                            src="/assets/lottery/pixel-design-1.jpg"
                            className="w-[673px] object-cover"
                        />
                        <img
                            alt="픽셀 디자인 두번째 이미지"
                            src="/assets/lottery/pixel-design-2.jpg"
                            className="w-[502px] object-cover"
                        />
                    </div>
                </div>
            </Section>

            <Section>
                <div className="w-[1200px] flex flex-col items-end">
                    <Description
                        label={
                            <>
                                2가지
                                <br />휠 디자인
                            </>
                        }
                        title={<>알로이 휠에도 픽셀이 형상화되어 있어요</>}
                        description={
                            <>
                                흔히 보던 평범한 휠의 모습이 아니예요! 가볍고 강도가 좋은 알로이
                                휠과 타이어는
                                <br />
                                17인치와 15인치 모두 픽셀을 활용한 각각의 매력을 자랑해요.
                            </>
                        }
                    />

                    <div className="mt-[98px] flex gap-700">
                        <img
                            alt="휠 디자인 첫번째 이미지"
                            src="/assets/lottery/wheel-design-1.jpg"
                            className="w-[588px] object-cover"
                        />
                        <img
                            alt="휠 디자인 두번째 이미지"
                            src="/assets/lottery/wheel-design-2.jpg"
                            className="w-[588px] object-cover"
                        />
                    </div>
                </div>
            </Section>

            <Section>
                <div className="w-[1200px]">
                    <Description
                        label={<>커스텀 디자인</>}
                        title={<>나만의 취향을 반영해 마음껏 꾸며보세요!</>}
                        description={
                            <>
                                문 안쪽의 도어 가니쉬는 여러 용도로 커스텀하며 필요한 것들을 거치할
                                수 있어요.
                                <br />
                                친구들과의 사진을 꽂아놓거나 필요한 물건들을 놓고 라이프스타일에
                                맞게 마음껏 활용해보세요
                            </>
                        }
                    />

                    <div className="mt-[98px] flex gap-700">
                        <img
                            alt="커스텀 디자인 첫번째 이미지"
                            src="/assets/lottery/custom-design-1.jpg"
                            className="w-[588px] object-cover"
                        />
                        <img
                            alt="커스텀 디자인 두번째 이미지"
                            src="/assets/lottery/custom-design-2.jpg"
                            className="w-[588px] object-cover"
                        />
                    </div>
                </div>
            </Section>

            <Section className="bg-n-neutral-50">
                <Description
                    direction="vertical"
                    label={<>ONLY 캐스퍼 일렉트릭</>}
                    title={<>5종의 신규 컬러가 새롭게 출시되었어요</>}
                    description={
                        <>
                            기존 캐스퍼에는 없었던 5개의 신규 컬러가 추가되면서
                            <br />
                            9종의 기본 컬러와 4종의 투톤 컬러를 자유롭게 선택할 수 있어요!
                        </>
                    }
                />

                <div className="mt-[86px]">
                    <img
                        alt="캐스퍼 신규 컬러 목록"
                        src="/assets/lottery/casper-list.webp"
                        className="max-w-[1800px]"
                    />
                </div>
            </Section>

            <Section className="bg-n-neutral-50 overflow-hidden relative">
                <img
                    alt="캐스퍼 뒷면 이미지"
                    src="/assets/lottery/casper-back.jpg"
                    className="w-[648px] absolute left-0 top-[197px]"
                />
                <img
                    alt="확대 아이콘"
                    src="/assets/lottery/scale-triangle.svg"
                    className="w-[490px] absolute left-[182px] top-[393px]"
                />
                <img
                    alt="캐스퍼 확대 이미지"
                    src="/assets/lottery/casper-badge.jpg"
                    className="absolute left-[668px] top-[393px] w-[792px] h-[460px] rounded-300"
                />
                <div className="absolute left-[668px] top-[156px]">
                    <Description
                        label={
                            <>
                                스마일
                                <br />
                                로봇 뱃지
                            </>
                        }
                        title={
                            <>
                                캐스퍼 일렉트릭의 뒷문에서
                                <br />
                                저를 찾아주세요
                            </>
                        }
                        description={
                            <>
                                캐스퍼 일렉트릭의 뒷문 손잡이 위쪽에 로봇 얼굴 뱃지가 생겼어요.
                                <br />
                                다양한 표정으로 커스터마이징도 가능하답니다.
                            </>
                        }
                    />
                </div>
                <Tooltip
                    content={
                        <>
                            나를 예쁘게 꾸미고 공유하면
                            <br />
                            캐스퍼 일렉트릭을 가질 수 있어
                        </>
                    }
                    isVisible
                    tooltipPosition="right"
                    absolutePosition={{ left: 884, top: 568 }}
                />
            </Section>

            <div className="h-[623px] bg-n-black flex flex-col justify-center items-center text-center">
                <img
                    alt="캐스퍼 아이콘"
                    src="/assets/common/casper.webp"
                    className="w-[258px] h-[258px]"
                />
                <div className="h-[26px]" />
                <h3 className="h-heading-3-bold text-n-white">
                    나만의 캐스퍼 일렉트릭 봇을 만들면
                    <br />
                    캐스퍼 일렉트릭부터 스타벅스 기프티콘까지 선물이 가득!
                </h3>
                <div className="h-[30px]" />
                <CTAButton label="캐스퍼 일렉트릭 봇 만들러 가기" hasIcon onClick={() => {}} />
            </div>

            <Notice />
            <Footer />
        </div>
    );
}

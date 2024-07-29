import Tooltip from "@/components/Tooltip";
import Description from "./Description";
import Section from "./Section";

export default function HeadLamp() {
    return (
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
    );
}

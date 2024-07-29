import Description from "./Description";
import Section from "./Section";

export default function NewColor() {
    return (
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
    );
}

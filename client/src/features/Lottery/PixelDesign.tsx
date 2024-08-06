import { motion } from "framer-motion";
import { DISSOLVE, SCROLL_MOTION } from "@/constants/animation.ts";
import Description from "./Description";
import Section from "./Section";

export default function PixelDesign() {
    return (
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
                            캐스퍼 일렉트릭은 방향 지시등이 단순한 빛이 아니라, 픽셀 형태의 독특한
                            패턴을 나타내요.
                            <br />
                            테일 램프와 운전대에도 이런 픽셀 디자인을 입혀 아이코닉함을 더한
                            디테일이 있답니다.
                        </>
                    }
                />

                <motion.div className="mt-[98px] flex gap-700" {...SCROLL_MOTION(DISSOLVE)}>
                    <img
                        alt="픽셀 디자인 첫번째 이미지"
                        src="/assets/lottery/pixel-design-1.jpg"
                        className="w-[673px] object-cover rounded-300"
                    />
                    <img
                        alt="픽셀 디자인 두번째 이미지"
                        src="/assets/lottery/pixel-design-2.jpg"
                        className="w-[502px] object-cover rounded-300"
                    />
                </motion.div>
            </div>
        </Section>
    );
}

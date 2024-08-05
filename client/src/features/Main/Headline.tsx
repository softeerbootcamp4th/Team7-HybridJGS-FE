import { forwardRef } from "react";
import Keyword from "@/components/Keyword";
import Scroll from "@/components/Scroll";
import { SectionKey } from "@/types/scrollAnimation.ts";

interface HeadlineProps {
    sectionId: SectionKey;
}

const Headline = forwardRef<HTMLDivElement, HeadlineProps>(({ sectionId }, ref) => {
    return (
        <section
            ref={ref}
            id={sectionId}
            className="h-screen bg-[url('/assets/main/car-1.jpg')] bg-no-repeat bg-cover flex flex-col justify-center items-center"
        >
            <Keyword children="CASPER Electric 출시 기념 이벤트" />
            <img
                src="/assets/main/title.webp"
                alt="main-title"
                className="w-[667px] h-[300px] mt-10"
            />
            <p className="h-heading-3-medium text-n-white pb-28">
                2024. 08. 21. (수) ~ 2024. 09. 03. (화)
            </p>
            <Scroll type="light">
                <p>이벤트에 대해 궁금하다면 </p>
                <p className="h-body-2-bold">스크롤</p>
                <p>해 보세요</p>
            </Scroll>
        </section>
    );
});

export default Headline;

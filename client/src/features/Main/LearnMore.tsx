import { forwardRef } from "react";
import CTAButton from "@/components/CTAButton";
import { SectionKey } from "@/types/scrollHeaderStyle.ts";

interface LearnMoreProps {
    sectionId: SectionKey;
}

const LearnMore = forwardRef<HTMLDivElement, LearnMoreProps>(({ sectionId }, ref) => {
    return (
        <section
            ref={ref}
            id={sectionId}
            className="flex flex-col gap-6 justify-center items-center h-[76.5vh] bg-[url('/assets/main/car-2.jpg')] bg-no-repeat bg-cover snap-start"
        >
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
    );
});

export default LearnMore;

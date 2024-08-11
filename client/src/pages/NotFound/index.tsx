import CTAButton from "@/components/CTAButton";

export default function NotFound() {
    return (
        <div className="h-screen bg-n-neutral-950 flex flex-col justify-center items-center">
            <img alt="not found 아이콘" src="/assets/icons/casper-error.svg" />
            <div className="mt-4" />
            <h3 className="h-heading-3-bold text-n-white">요청하신 페이지를 찾을 수 없습니다.</h3>
            <div className="mt-12" />
            <CTAButton label="홈으로 이동하기" url="/" hasArrowIcon />
        </div>
    );
}

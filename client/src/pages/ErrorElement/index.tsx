import CTAButton from "@/components/CTAButton";

interface ErrorElementProps {
    fallbackUrl?: string;
}

export default function ErrorElement({ fallbackUrl = "/" }: ErrorElementProps) {
    const handleClickButton = () => {
        window.location.href = fallbackUrl;
    };

    return (
        <div className="fixed z-10 h-screen w-full bg-n-neutral-950 flex flex-col justify-center items-center">
            <img alt="오류 아이콘" src="/assets/icons/casper-error.svg" />
            <div className="mt-4" />
            <h3 className="h-heading-3-bold text-n-white">
                문제가 발생했습니다. 잠시 후 다시 시도해 보세요.
            </h3>
            <div className="mt-12" />
            <CTAButton label="돌아가기" hasArrowIcon onClick={handleClickButton} />
        </div>
    );
}

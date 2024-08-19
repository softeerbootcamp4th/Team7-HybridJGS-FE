import { useCookies } from "react-cookie";
import Button from "@/components/Button";
import { COOKIE_KEY } from "@/constants/cookie";

interface ErrorElementProps {
    fallbackUrl?: string;
}

export default function ErrorElement({ fallbackUrl = "/" }: ErrorElementProps) {
    const [_cookies, _setCookie, removeCookie] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const handleClickButton = () => {
        window.location.href = fallbackUrl;
        removeCookie(COOKIE_KEY.ACCESS_TOKEN);
    };

    return (
        <div className="fixed z-10 h-screen w-full bg-n-neutral-950 flex flex-col justify-center items-center">
            <h3 className="h-heading-3-bold text-n-white">
                문제가 발생했습니다. 잠시 후 다시 시도해 보세요.
            </h3>
            <div className="mt-12" />
            <Button buttonSize="lg" onClick={handleClickButton}>
                돌아가기
            </Button>
        </div>
    );
}

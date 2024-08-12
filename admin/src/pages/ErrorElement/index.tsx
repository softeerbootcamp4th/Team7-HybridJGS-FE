import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

interface ErrorElementProps {
    fallbackUrl?: string;
}

export default function ErrorElement({ fallbackUrl = "/" }: ErrorElementProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed z-10 h-screen w-full bg-n-neutral-950 flex flex-col justify-center items-center">
            <h3 className="h-heading-3-bold text-n-white">
                문제가 발생했습니다. 잠시 후 다시 시도해 보세요.
            </h3>
            <div className="mt-12" />
            <Button buttonSize="lg" onClick={() => navigate(fallbackUrl)}>
                돌아가기
            </Button>
        </div>
    );
}

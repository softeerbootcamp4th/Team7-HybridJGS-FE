import { PropsWithChildren } from "react";

interface SuspenseProps extends PropsWithChildren {
    isLoading?: boolean;
}

export default function Suspense({ children, isLoading = false }: SuspenseProps) {
    return (
        <>
            {isLoading ? (
                <div className="fixed z-10 h-screen w-full bg-n-neutral-950 flex flex-col justify-center items-center">
                    <h3 className="h-heading-3-bold text-n-white mb-20">
                        데이터를 불러오는 중입니다...
                    </h3>
                </div>
            ) : (
                children
            )}
        </>
    );
}

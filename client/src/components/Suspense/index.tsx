import { PropsWithChildren } from "react";

interface SuspenseProps extends PropsWithChildren {
    isLoading?: boolean;
}

export default function Suspense({ children, isLoading = false }: SuspenseProps) {
    return <>{isLoading ? <></> : children}</>;
}

import { PropsWithChildren } from "react";

interface CasperCustomPanelLayoutProps extends PropsWithChildren {
    className?: string;
}

export default function CasperCustomPanelLayout({
    children,
    className,
}: CasperCustomPanelLayoutProps) {
    return (
        <div className={`w-[724px] h-[500px] bg-n-neutral-950 rounded-800 ${className}`}>
            {children}
        </div>
    );
}

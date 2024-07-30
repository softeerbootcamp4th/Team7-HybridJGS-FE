import { PropsWithChildren } from "react";

interface BotCustomPanelLayoutProps extends PropsWithChildren {
    className?: string;
}

export default function BotCustomPanelLayout({ children, className }: BotCustomPanelLayoutProps) {
    return (
        <div className={`w-[724px] h-[500px] bg-n-neutral-950 rounded-800 ${className}`}>
            {children}
        </div>
    );
}

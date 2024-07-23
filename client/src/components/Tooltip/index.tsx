import { ReactNode, useEffect, useRef, useState } from "react";

export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    positionPercent?: string;
    isVisible: boolean;
}
interface PositionType {
    top: number | null;
    left: number | null;
}

export default function Tooltip({
    content,
    children,
    positionPercent = "50%",
    isVisible,
}: TooltipProps) {
    const [position, setPosition] = useState<PositionType>({ top: null, left: null });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const contentStyle = {
        top: `${position.top}px`,
        left: `calc(${position.left}px - ${positionPercent})`,
    };

    const arrowStyle = {
        left: positionPercent,
    };

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            setPosition({
                top: window.scrollY - tooltipRect.height - 8,
                left: window.scrollX,
            });
        }
    }, [isVisible, positionPercent]);

    return (
        <div className="relative" ref={triggerRef}>
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="absolute z-10 h-heading-4-bold bg-s-yellow text-n-gray-950 rounded-200 py-400 px-500 whitespace-nowrap"
                    style={contentStyle}
                >
                    {content}
                    <div
                        className="absolute bottom-[-10px] translate-x-[-50%] w-0 h-0 border-x-[10.5px] border-x-transparent border-t-[12px] border-t-s-yellow border-solid"
                        style={arrowStyle}
                    ></div>
                </div>
            )}
        </div>
    );
}

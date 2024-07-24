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

const TOOLTIP_GAP = 10;

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
        left: `${position.left}px`,
    };

    const arrowStyle = {
        left: positionPercent,
    };

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            const percentToAdditionWidth = (tooltipRect.width * parseInt(positionPercent)) / 100;

            setPosition({
                top: window.scrollY - tooltipRect.height - TOOLTIP_GAP,
                left: window.scrollX - percentToAdditionWidth + triggerRect.width / 2,
            });
        }
    }, [isVisible, positionPercent]);

    return (
        <div className="relative" ref={triggerRef}>
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="absolute z-10 h-heading-4-bold bg-s-yellow text-n-neutral-950 rounded-200 py-400 px-500 whitespace-nowrap text-center"
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

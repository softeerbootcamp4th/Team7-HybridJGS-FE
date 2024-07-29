import { ReactNode, useEffect, useRef, useState } from "react";

type TooltipPositionType = "left" | "center" | "right";
type TooltipAbsolutePositionType = { left: number; top: number };
export interface TooltipProps {
    content: ReactNode;
    children?: ReactNode;
    tooltipPosition?: TooltipPositionType;
    absolutePosition?: TooltipAbsolutePositionType;
    isVisible?: boolean;
}
interface PositionType {
    top: number | null;
    left: number | null;
}

const TOOLTIP_GAP = 18;
const TOOLTIP_POSITION_MAP = {
    left: "10%",
    center: "50%",
    right: "90%",
};

export default function Tooltip({
    content,
    children,
    tooltipPosition = "center",
    isVisible = true,
    absolutePosition,
}: TooltipProps) {
    const [position, setPosition] = useState<PositionType>({ top: null, left: null });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isAbsolutePosition = !!absolutePosition;

    const contentStyle = {
        top: `${position.top}px`,
        left: `${position.left}px`,
    };

    const arrowStyle = {
        left: TOOLTIP_POSITION_MAP[tooltipPosition],
    };

    useEffect(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) {
            return;
        }

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        if (isAbsolutePosition) {
            setPosition({
                top: absolutePosition.top - tooltipRect.height - TOOLTIP_GAP,
                left: absolutePosition.left,
            });
            return;
        }

        const leftPosition = getLeftPosition(tooltipPosition, triggerRect.width, tooltipRect.width);

        setPosition({
            top: window.scrollY - tooltipRect.height - TOOLTIP_GAP,
            left: window.scrollX + leftPosition,
        });
    }, [isVisible, tooltipPosition]);

    const getLeftPosition = (
        position: TooltipPositionType,
        triggerWidth: number,
        tooltipWidth: number
    ) => {
        switch (position) {
            case "left":
                return 0;
            case "center":
                return triggerWidth / 2 - tooltipWidth / 2;
            case "right":
                return triggerWidth - tooltipWidth;
            default:
                return 0;
        }
    };

    return (
        <div className={`${isAbsolutePosition ? "" : "relative"}`} ref={triggerRef}>
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

import { useEffect, useRef, useState } from "react";

export interface ToggleProps {
    leftText: string;
    rightText: string;
    isLeftSelected: boolean;
    handleToggle: (val: boolean) => void;
}

const PADDING = 8;

export default function Toggle({ leftText, rightText, isLeftSelected, handleToggle }: ToggleProps) {
    const leftTextRef = useRef<HTMLDivElement>(null);
    const rightTextRef = useRef<HTMLDivElement>(null);
    const [selectedWidth, setSelectedWidth] = useState<number>(0);
    const [selectedTranslate, setSelectedTranslate] = useState<number>(0);

    const toggleBackgroundDynamicStyle = {
        width: selectedWidth,
        transform: `translateX(${selectedTranslate}px)`,
    };

    useEffect(() => {
        if (document.fonts) {
            document.fonts.ready.then(calculateTextWidth);
        } else {
            window.addEventListener("load", calculateTextWidth);
            return () => window.removeEventListener("load", calculateTextWidth);
        }
    }, []);

    useEffect(() => {
        calculateTextWidth();
    }, [isLeftSelected, leftText, rightText]);

    const calculateTextWidth = () => {
        if (!leftTextRef.current || !rightTextRef.current) {
            return;
        }

        const leftWidth = leftTextRef.current.offsetWidth;
        const rightWidth = rightTextRef.current.offsetWidth;
        setSelectedWidth(isLeftSelected ? leftWidth : rightWidth);

        const translate = isLeftSelected ? PADDING : leftWidth + PADDING * 2;
        setSelectedTranslate(translate);
    };

    const handleToggleClick = () => {
        handleToggle(!isLeftSelected);
    };

    return (
        <div
            className="bg-n-white rounded-700 p-300 inline-flex items-center gap-300 cursor-pointer relative select-none"
            onClick={handleToggleClick}
        >
            <div
                className="rounded-500 bg-n-black absolute top-300 left-0 h-[30px] transition-all duration-500"
                style={toggleBackgroundDynamicStyle}
            ></div>
            <div
                ref={leftTextRef}
                className="h-body-2-bold py-200 px-300 z-10 mix-blend-difference text-n-white"
            >
                {leftText}
            </div>
            <div
                ref={rightTextRef}
                className="h-body-2-bold py-200 px-300 z-10 mix-blend-difference text-n-white"
            >
                {rightText}
            </div>
        </div>
    );
}

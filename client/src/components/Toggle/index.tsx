import { useEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";

export interface ToggleProps {
    options: string[];
    selectedIdx: number;
    handleToggle: (idx: number) => void;
}

const PADDING = 8;

const optionVariants = cva(`h-body-2-bold py-200 px-300 z-10 transition-all duration-500`, {
    variants: {
        isSelected: {
            true: "text-n-white",
            false: "text-n-neutral-500",
        },
    },
});

export default function Toggle({ options, selectedIdx = 0, handleToggle }: ToggleProps) {
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    }, [selectedIdx, options]);

    const calculateTextWidth = () => {
        if (optionRefs.current.some((ref) => ref === null)) {
            return;
        }

        const optionElements = optionRefs.current as HTMLDivElement[];
        const selectedOptionRef = optionElements[selectedIdx];
        if (!selectedOptionRef) {
            return;
        }

        const selectedOptionWidth = selectedOptionRef.offsetWidth;
        setSelectedWidth(selectedOptionWidth);

        const translate = optionElements
            .slice(0, selectedIdx)
            .reduce((acc, val) => acc + val.offsetWidth + PADDING, PADDING);
        setSelectedTranslate(translate);
    };

    const handleToggleClick = (idx: number) => {
        handleToggle(idx);
    };

    return (
        <div className="bg-n-neutral-50 rounded-700 p-300 inline-flex items-center gap-300 cursor-pointer relative select-none">
            <div
                className="rounded-500 bg-n-neutral-950 absolute top-300 left-0 h-[30px] transition-all duration-500"
                style={toggleBackgroundDynamicStyle}
            ></div>
            {options.map((option, idx) => (
                <div
                    key={idx}
                    ref={(ref) => (optionRefs.current[idx] = ref)}
                    className={optionVariants({ isSelected: idx === selectedIdx })}
                    onClick={() => handleToggleClick(idx)}
                >
                    {option}
                </div>
            ))}
        </div>
    );
}

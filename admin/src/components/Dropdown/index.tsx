import { useState } from "react";

interface DropdownProps {
    options: string[];
    selectedIdx: number;
    handleClickOption: (idx: number) => void;
}

export default function Dropdown({ options, selectedIdx, handleClickOption }: DropdownProps) {
    const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);

    const handleClick = (idx: number) => {
        handleClickOption(idx);
        setIsVisibleOptions(false);
    };

    return (
        <>
            <div
                className="fixed w-screen h-screen left-0 top-0"
                onClick={() => setIsVisibleOptions(false)}
            />
            <div className="relative inline-block text-left">
                <div onClick={() => setIsVisibleOptions(!isVisibleOptions)}>
                    {options[selectedIdx]}
                </div>
                {isVisibleOptions && (
                    <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="p-[16px] flex flex-col gap-2">
                            {options.map((option, idx) => (
                                <p
                                    key={`dropdown-${option}-${idx}`}
                                    onClick={() => handleClick(idx)}
                                    className="break-keep text-nowrap"
                                >
                                    {option}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

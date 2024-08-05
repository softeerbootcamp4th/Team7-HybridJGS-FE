import { cva } from "class-variance-authority";

interface TabHeaderProps {
    tabList: string[];
    handleClickTab: (idx: number) => void;
    selectedIdx: number;
}

const TabButtonVariants = cva(`border-b-2`, {
    variants: {
        selected: {
            true: "h-body-1-bold border-neutral-950",
            false: "h-body-1-regular border-transparent",
        },
    },
});

export default function TabHeader({ tabList, selectedIdx, handleClickTab }: TabHeaderProps) {
    return (
        <div className="w-full h-[80px] flex px-[40px] gap-[40px]">
            {tabList.map((tab, idx) => (
                <button
                    key={idx}
                    className={TabButtonVariants({ selected: selectedIdx === idx })}
                    onClick={() => handleClickTab(idx)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";
import { TAB_OPTIONS } from "@/constants/tabOptions";

const TabButtonVariants = cva(`border-b-2 flex items-center`, {
    variants: {
        selected: {
            true: "h-body-1-bold border-neutral-950",
            false: "h-body-1-regular border-transparent",
        },
    },
});

export default function TabHeader() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const tabIdx = TAB_OPTIONS.findIndex((tab) => pathname.startsWith(tab.route));

        setSelectedIdx(tabIdx);
    }, [location]);

    return (
        <div className="w-full h-[80px] flex px-[40px] gap-[40px]">
            {TAB_OPTIONS.map((tab, idx) => (
                <Link
                    key={idx}
                    className={TabButtonVariants({ selected: selectedIdx === idx })}
                    to={TAB_OPTIONS[idx].route}
                >
                    {tab.title}
                </Link>
            ))}
        </div>
    );
}

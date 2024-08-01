import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonHeader from "../ButtonHeader";
import { backgroundBlurVariants, logoVariants } from "./index.style";

export interface HeaderProps {
    type: "light" | "dark";
}

const EVENT_TYPE = {
    LOTTERY: "lottery",
    RUSH: "rush",
};
type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export default function Header({ type }: HeaderProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventType | "">("");
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const selectedEventType = pathname.startsWith(`/${EVENT_TYPE.LOTTERY}`)
            ? EVENT_TYPE.LOTTERY
            : pathname.startsWith(`/${EVENT_TYPE.RUSH}`)
              ? EVENT_TYPE.RUSH
              : "";
        setSelectedEvent(selectedEventType);
    }, [location]);

    return (
        <header className="flex justify-center fixed top-0 w-full h-16 overflow-hidden z-20">
            <div className={backgroundBlurVariants({ type })}></div>
            <div className="w-[1200px] flex justify-between">
                <Link to="/" className={logoVariants({ type })}>
                    CASPER Electric Event
                </Link>
                <div className="flex gap-700">
                    <ButtonHeader
                        isSelected={selectedEvent === EVENT_TYPE.LOTTERY}
                        type={type}
                        url={`/${EVENT_TYPE.LOTTERY}`}
                    >
                        나만의 캐스퍼 일렉트릭 봇 만들기
                    </ButtonHeader>
                    <ButtonHeader
                        isSelected={selectedEvent === EVENT_TYPE.RUSH}
                        type={type}
                        url={`/${EVENT_TYPE.RUSH}`}
                    >
                        선착순 밸런스 게임
                    </ButtonHeader>
                </div>
            </div>
        </header>
    );
}

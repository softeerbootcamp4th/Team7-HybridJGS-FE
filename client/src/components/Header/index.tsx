import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonHeader from "../ButtonHeader";
import { backgroundBlurVariants, logoVariants } from "./index.style";

export interface HeaderProps {
    type: "light" | "dark";
}

const EVENT_TYPE = {
    RAFFLE: "raffle",
    FIRST_COME: "first-come",
};
type EventType = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export default function Header({ type }: HeaderProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventType | "">("");
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const selectedEventType =
            pathname === "/bot"
                ? EVENT_TYPE.RAFFLE
                : pathname === "/balence"
                  ? EVENT_TYPE.FIRST_COME
                  : "";
        setSelectedEvent(selectedEventType);
    }, [location]);

    return (
        <header className="flex justify-center fixed top-0 w-full h-16 overflow-hidden z-20">
            <div className={backgroundBlurVariants({ type })}></div>
            <div className="w-[1200px] flex justify-between">
                <h1 className={logoVariants({ type })}>CASPER Electric Event</h1>
                <div className="flex gap-700">
                    <ButtonHeader
                        isSelected={selectedEvent === EVENT_TYPE.RAFFLE}
                        type={type}
                        url="/bot"
                    >
                        {/* TODO: URL 경로 수정 */}
                        나만의 캐스퍼 일렉트릭 봇 만들기
                    </ButtonHeader>
                    <ButtonHeader
                        isSelected={selectedEvent === EVENT_TYPE.FIRST_COME}
                        type={type}
                        url="/balence"
                    >
                        선착순 밸런스 게임
                    </ButtonHeader>
                </div>
            </div>
        </header>
    );
}

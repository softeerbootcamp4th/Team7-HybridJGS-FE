import { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface HeaderProps {
    type: "light" | "dark";
}

interface ButtonHeaderProps {
    isSelected: boolean;
    children: ReactNode;
}

const buttonVariants = cva(`h-body-2-medium h-[48px] py-300`, {
    variants: {
        isSelected: {
            true: "",
            false: "text-n-neutral-500",
        },
    },
});

function ButtonHeader({ isSelected, children }: ButtonHeaderProps) {
    return (
        <button className={buttonVariants({ isSelected })}>
            <p>{children}</p>
        </button>
    );
}

export default function Header({ type }: HeaderProps) {
    return (
        <header className="flex justify-center fixed w-full">
            <div className="w-[1200px] flex justify-between">
                <h1 className="h-heading-3-medium !text-[24px] !leading-8 h-[32px]">
                    CASPER Electric Event
                </h1>
                <div className="flex gap-700">
                    <ButtonHeader isSelected={true}>나만의 캐스퍼 일렉트릭 봇 만들기</ButtonHeader>
                    <ButtonHeader isSelected={false}>선착순 밸런스 게임</ButtonHeader>
                </div>
            </div>
            <div className="absolute blur-lg w-full h-16"></div>
        </header>
    );
}

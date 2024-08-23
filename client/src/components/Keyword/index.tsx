import { ReactNode } from "react";

export interface KeywordProps {
    children: ReactNode;
}

export default function Keyword({ children }: KeywordProps) {
    return (
        <span className="px-400 py-300 rounded-1000 bg-s-blue text-n-white h-heading-4-bold">
            {children}
        </span>
    );
}

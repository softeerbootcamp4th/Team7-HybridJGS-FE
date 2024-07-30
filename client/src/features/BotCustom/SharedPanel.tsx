import { ReactNode } from "react";
import Category from "@/components/Category";
import { CUSTOM_OPTION } from "@/constants/BotCustom/casper";
import BotCustomPanelLayout from "./BotCustomPanelLayout";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
interface SharedPanelProps {
    selectedPanel: CustomOptionType;
    limitedOptions?: {
        id: string;
        component: ReactNode;
    }[];
    basicOptions?: {
        id: string;
        component: ReactNode;
    }[];
}

export default function SharedPanel({ limitedOptions, basicOptions }: SharedPanelProps) {
    const hasLimitedOptions = limitedOptions && limitedOptions.length !== 0;
    const hasBasicOptions = basicOptions && basicOptions.length !== 0;

    return (
        <BotCustomPanelLayout className="px-[30px] py-1000">
            {hasLimitedOptions && (
                <>
                    <div className="flex flex-col gap-700">
                        <Category type="limited">CASPER Electric Limited</Category>
                        <ul className="flex gap-700 flex-wrap">
                            {limitedOptions.map((option) => option.component)}
                        </ul>
                    </div>

                    <div className="mt-[48px]" />
                </>
            )}

            {hasBasicOptions && (
                <div className="flex flex-col gap-700">
                    <Category type="basic">Basic</Category>
                    <ul className="flex gap-700 flex-wrap">
                        {basicOptions.map((option) => option.component)}
                    </ul>
                </div>
            )}
        </BotCustomPanelLayout>
    );
}

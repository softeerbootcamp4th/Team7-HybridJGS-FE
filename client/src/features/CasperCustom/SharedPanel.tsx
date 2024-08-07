import { Fragment, ReactNode } from "react";
import Category from "@/components/Category";
import { CUSTOM_OPTION } from "@/constants/CasperCustom/casper";
import { CasperCustomPanelLayout } from "./CasperCustomPanelLayout";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
type OptionListItemType = {
    id: string;
    component: ReactNode;
};
interface SharedPanelProps {
    selectedPanel: CustomOptionType;
    limitedOptions?: OptionListItemType[];
    basicOptions?: OptionListItemType[];
}

export function SharedPanel({ limitedOptions, basicOptions }: SharedPanelProps) {
    const hasLimitedOptions = limitedOptions && limitedOptions.length !== 0;
    const hasBasicOptions = basicOptions && basicOptions.length !== 0;

    return (
        <CasperCustomPanelLayout className="px-[30px] py-1000">
            {hasLimitedOptions && (
                <>
                    <div className="flex flex-col gap-700">
                        <Category type="limited">CASPER Electric Limited</Category>
                        <ul className="flex gap-700 flex-wrap">
                            {limitedOptions.map((option) => (
                                <Fragment key={option.id}>{option.component}</Fragment>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-12" />
                </>
            )}

            {hasBasicOptions && (
                <div className="flex flex-col gap-700">
                    <Category type="basic">Basic</Category>
                    <ul className="flex gap-700 flex-wrap">
                        {basicOptions.map((option) => (
                            <Fragment key={option.id}>{option.component}</Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </CasperCustomPanelLayout>
    );
}

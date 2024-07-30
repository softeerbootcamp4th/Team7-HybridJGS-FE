import { cva } from "class-variance-authority";
import Category from "@/components/Category";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_TYPE } from "@/constants/BotCustom/casper";
import useBotCustomContext from "@/hooks/useBotCustomContext";
import BotCustomPanelLayout from "./BotCustomPanelLayout";

type CustomOptionType = (typeof CUSTOM_OPTION)[keyof typeof CUSTOM_OPTION];
interface SharedPanelProps {
    selectedPanel: CustomOptionType;
}

const selectableImageVariants = cva(`rounded-1000 border-[2px] bg-n-white`, {
    variants: {
        selected: {
            true: "border-s-red",
            false: "border-transparent",
        },
    },
});

export default function SharedPanel({ selectedPanel }: SharedPanelProps) {
    const { selectedBotIdx, handleSelectOption } = useBotCustomContext();

    const options = CASPER_OPTION[selectedPanel];
    const selectedIdx = selectedBotIdx[selectedPanel];
    const selectedOption = selectedIdx !== null ? options[selectedIdx] : null;

    const limitedOptions = options.filter((option) => option.type === OPTION_TYPE.LIMITED);
    const basicOptions = options.filter((option) => option.type === OPTION_TYPE.BASIC);

    const hasLimitedOptions = limitedOptions.length !== 0;
    const hasBasicOptions = basicOptions.length !== 0;

    const handleClickOption = (id: string) => {
        handleSelectOption(selectedPanel, id);
    };

    return (
        <BotCustomPanelLayout className="px-[30px] py-1000">
            {hasLimitedOptions && (
                <>
                    <div className="flex flex-col gap-700">
                        <Category type="limited">CASPER Electric Limited</Category>
                        <div className="flex gap-700">
                            {limitedOptions.map((option) => (
                                <button
                                    key={option.id}
                                    className={selectableImageVariants({
                                        selected:
                                            selectedOption !== null
                                                ? selectedOption.id === option.id
                                                : false,
                                    })}
                                    onClick={() => handleClickOption(option.id)}
                                >
                                    <img
                                        src={`/assets/bot-custom/preview/${option.id}.png`}
                                        style={{ width: "72px", height: "72px" }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-[48px]" />
                </>
            )}

            {hasBasicOptions && (
                <div className="flex flex-col gap-700">
                    <Category type="basic">Basic</Category>
                    <div className="flex gap-700">
                        {basicOptions.map((option) => (
                            <button
                                key={option.id}
                                className={selectableImageVariants({
                                    selected:
                                        selectedOption !== null
                                            ? selectedOption.id === option.id
                                            : false,
                                })}
                                onClick={() => handleClickOption(option.id)}
                            >
                                <img
                                    src={`/assets/bot-custom/preview/${option.id}.png`}
                                    style={{ width: "72px", height: "72px" }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </BotCustomPanelLayout>
    );
}

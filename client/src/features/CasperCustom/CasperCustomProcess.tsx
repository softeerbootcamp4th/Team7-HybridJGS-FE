import { useState } from "react";
import { cva } from "class-variance-authority";
import ListStep from "@/components/ListStep";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_TYPE } from "@/constants/CasperCustom/casper";
import CasperCardFront from "@/features/CasperCustom/CasperCardFront";
import CustomOptionImageItem from "@/features/CasperCustom/CustomOptionImageItem";
import EyesPanel from "@/features/CasperCustom/EyesPanel";
import SharedPanel from "@/features/CasperCustom/SharedPanel";
import useCasperCustomContext from "@/hooks/useCasperCustomContext";
import CasperCardBack from "./CasperCardBack";

export default function CasperCustomProcess() {
    const { selectedCasperIdx, handleSelectOption } = useCasperCustomContext();
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const mouthOptions = CASPER_OPTION[CUSTOM_OPTION.MOUTH];
    const mouthSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.MOUTH];
    const mouthSelectedOption = mouthOptions[mouthSelectedIdx];

    const colorOptions = CASPER_OPTION[CUSTOM_OPTION.COLOR];
    const colorSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.COLOR];
    const colorSelectedOption = colorOptions[colorSelectedIdx];

    const stickerOptions = CASPER_OPTION[CUSTOM_OPTION.STICKER];
    const stickerSelectedIdx = selectedCasperIdx[CUSTOM_OPTION.STICKER];
    const stickerSelectedOption =
        stickerSelectedIdx !== null ? stickerOptions[stickerSelectedIdx] : null;

    const mouthLimited = CASPER_OPTION[CUSTOM_OPTION.MOUTH]
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <CustomOptionImageItem
                        key={option.id}
                        optionId={option.id}
                        selected={
                            mouthSelectedOption !== null
                                ? mouthSelectedOption.id === option.id
                                : false
                        }
                        handleClickOption={() => handleSelectOption(CUSTOM_OPTION.MOUTH, option.id)}
                    />
                ),
            };
        });
    const mouthBasic = CASPER_OPTION[CUSTOM_OPTION.MOUTH]
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <CustomOptionImageItem
                        key={option.id}
                        optionId={option.id}
                        selected={
                            mouthSelectedOption !== null
                                ? mouthSelectedOption.id === option.id
                                : false
                        }
                        handleClickOption={() => handleSelectOption(CUSTOM_OPTION.MOUTH, option.id)}
                    />
                ),
            };
        });

    const colorVariants = cva(`rounded-1000 border-[2px] w-[72px] h-[72px] cursor-pointer`, {
        variants: {
            selected: {
                true: "border-s-red",
                false: "border-transparent",
            },
        },
    });

    const colorLimited = CASPER_OPTION[CUSTOM_OPTION.COLOR]
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <div
                        className={colorVariants({
                            selected:
                                colorSelectedOption !== null
                                    ? colorSelectedOption.id === option.id
                                    : false,
                        })}
                        style={{ backgroundColor: option.id }}
                        onClick={() => handleSelectOption(CUSTOM_OPTION.COLOR, option.id)}
                    />
                ),
            };
        });
    const colorBasic = CASPER_OPTION[CUSTOM_OPTION.COLOR]
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <div
                        className={colorVariants({
                            selected:
                                colorSelectedOption !== null
                                    ? colorSelectedOption.id === option.id
                                    : false,
                        })}
                        style={{ backgroundColor: option.id }}
                        onClick={() => handleSelectOption(CUSTOM_OPTION.COLOR, option.id)}
                    />
                ),
            };
        });

    const stickerLimited = CASPER_OPTION[CUSTOM_OPTION.STICKER]
        .filter((option) => option.type === OPTION_TYPE.LIMITED)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <CustomOptionImageItem
                        key={option.id}
                        optionId={option.id}
                        selected={
                            stickerSelectedOption !== null
                                ? stickerSelectedOption.id === option.id
                                : false
                        }
                        handleClickOption={() =>
                            handleSelectOption(CUSTOM_OPTION.STICKER, option.id)
                        }
                    />
                ),
            };
        });
    const stickerBasic = CASPER_OPTION[CUSTOM_OPTION.STICKER]
        .filter((option) => option.type === OPTION_TYPE.BASIC)
        .map((option) => {
            return {
                id: option.id,
                component: (
                    <CustomOptionImageItem
                        key={option.id}
                        optionId={option.id}
                        selected={
                            stickerSelectedOption !== null
                                ? stickerSelectedOption.id === option.id
                                : false
                        }
                        handleClickOption={() =>
                            handleSelectOption(CUSTOM_OPTION.STICKER, option.id)
                        }
                    />
                ),
            };
        });

    return (
        <>
            <ListStep
                options={["눈", "입", "색상", "스티커"]}
                selectedIdx={selectedOption}
                handleClickOption={(idx) => setSelectedOption(idx)}
            />
            <CasperCardFront optionDescription="정면을 보는 15인치 알로이 휠 눈" />
            <CasperCardFront size="sm" />
            <CasperCardBack
                casperName="가다나라마바사"
                expectations="일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십"
            />
            <CasperCardBack
                size="sm"
                casperName="가다나라마바사"
                expectations="일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십"
            />

            <EyesPanel />
            <SharedPanel
                selectedPanel={CUSTOM_OPTION.MOUTH}
                limitedOptions={mouthLimited}
                basicOptions={mouthBasic}
            />
            <SharedPanel
                selectedPanel={CUSTOM_OPTION.COLOR}
                limitedOptions={colorLimited}
                basicOptions={colorBasic}
            />
            <SharedPanel
                selectedPanel={CUSTOM_OPTION.STICKER}
                limitedOptions={stickerLimited}
                basicOptions={stickerBasic}
            />
        </>
    );
}
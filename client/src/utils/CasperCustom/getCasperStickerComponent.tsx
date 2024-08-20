import { STICKER_OPTION } from "@/constants/CasperCustom/casper";
import ChargeMax from "/public/assets/casper-custom/sticker/charge-max.svg?react";
import ChargeNone from "/public/assets/casper-custom/sticker/charge-none.svg?react";
import Electric from "/public/assets/casper-custom/sticker/electric.svg?react";
import Lovely from "/public/assets/casper-custom/sticker/lovely.svg?react";
import Twinkle from "/public/assets/casper-custom/sticker/twinkle.svg?react";

type StickerOptionType = (typeof STICKER_OPTION)[keyof typeof STICKER_OPTION];

const STICKER_COMPONENT_MAP: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>> | null
> = {
    "charge-max": ChargeMax,
    "charge-none": ChargeNone,
    electric: Electric,
    lovely: Lovely,
    twinkle: Twinkle,
};

export function getCasperStickerComponent(
    sticker: StickerOptionType | null
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    if (sticker === null) {
        return null;
    }
    return STICKER_COMPONENT_MAP[sticker];
}

import { STICKER_OPTION } from "@/constants/CasperCustom/casper";
import ChargeMax from "/public/assets/casper-custom/sticker/charge-max.svg?react";
import ChargeNone from "/public/assets/casper-custom/sticker/charge-none.svg?react";
import Electric from "/public/assets/casper-custom/sticker/electric.svg?react";
import Lovely from "/public/assets/casper-custom/sticker/lovely.svg?react";
import Twinkle from "/public/assets/casper-custom/sticker/twinkle.svg?react";

const STICKER_COMPONENT_MAP: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>> | null
> = {
    [STICKER_OPTION.CHARGE_MAX]: ChargeMax,
    [STICKER_OPTION.CHARGE_NONE]: ChargeNone,
    [STICKER_OPTION.ELECTRIC]: Electric,
    [STICKER_OPTION.LOVELY]: Lovely,
    [STICKER_OPTION.TWINKLE]: Twinkle,
};

export function getCasperStickerComponent(
    sticker: STICKER_OPTION | null
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
    if (sticker === null) {
        return null;
    }
    return STICKER_COMPONENT_MAP[sticker];
}

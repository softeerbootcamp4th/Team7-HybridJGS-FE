import { OPTION_POSITION } from "@/constants/rush";
import { RushOptionType } from "@/types/rush";

export function sortRushOptions(aOption: RushOptionType) {
    if (aOption.position === OPTION_POSITION.LEFT) {
        return -1;
    }
    return 1;
}

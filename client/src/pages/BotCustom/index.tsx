import { BotCustomProvider } from "@/contexts/botCustomContext";
import CasperCard from "@/features/BotCustom/CasperCard";
import ListStep from "@/features/BotCustom/ListStep";

export default function BotCustom() {
    return (
        <BotCustomProvider>
            <ListStep options={["눈", "입", "색상", "스티커"]} selectedIdx={3} />
            <CasperCard optionDescription="정면을 보는 15인치 알로이 휠 눈" />
            <CasperCard size="sm" />
        </BotCustomProvider>
    );
}

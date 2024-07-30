import { BotCustomProvider } from "@/contexts/botCustomContext";
import CasperCard from "@/features/BotCustom/CasperCard";
import ListStep from "@/features/BotCustom/ListStep";

export default function BotCustom() {
    return (
        <BotCustomProvider>
            <ListStep options={["눈", "입", "색상", "스티커"]} selectedIdx={3} />
            <CasperCard casperName="김캐스퍼" />
            <CasperCard size="sm" casperName="주캐스퍼" />
        </BotCustomProvider>
    );
}

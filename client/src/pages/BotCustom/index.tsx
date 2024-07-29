import ListStep from "@/features/BotCustom/ListStep";

export default function BotCustom() {
    return (
        <div>
            <ListStep options={["눈", "입", "색상", "스티커"]} selectedIdx={3} />
        </div>
    );
}

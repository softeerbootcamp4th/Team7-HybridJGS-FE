import RushCard from "@/features/Rush/RushCard.tsx";

export default function RushCardComparison() {
    return (
        <div className="flex gap-10 justify-center items-center">
            <RushCard />
            <p className="h-heading-2-bold text-n-neutral-500 bg-n-neutral-50 rounded-800 w-[90px] h-[78px] flex justify-center items-center">
                VS
            </p>
            <RushCard />
        </div>
    );
}

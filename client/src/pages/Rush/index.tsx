import RushCardComparison from "@/features/Rush/RushCardComparison.tsx";
import RushCardDescription from "@/features/Rush/RushCardDescription.tsx";

export default function Rush() {
    return (
        <div className="mt-32">
            <RushCardComparison />
            <RushCardDescription color="red" />
        </div>
    );
}

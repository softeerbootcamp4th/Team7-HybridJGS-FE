import RushCard from "@/features/Rush/RushCard.tsx";
import RushCardComparison from "@/features/Rush/RushCardComparison.tsx";
import RushCardDescription from "@/features/Rush/RushCardDescription.tsx";

export default function Rush() {
    // 컴포넌트 테스트용 (storybook X)
    return (
        <div className="mt-32">
            <RushCard />
            <RushCardComparison />
            <RushCardDescription color="red" />
        </div>
    );
}
